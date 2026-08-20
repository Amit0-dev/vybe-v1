import type { Request, Response } from "express";
import { generateMagicLinkSchema, queryParamsSchema } from "../validators/user.validators.js";
import { AppError, NotFoundError, ValidationError } from "../utils/error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
    createMagicLink,
    createUser,
    deleteMagicLink,
    findUserByEmail,
    getRecordByToken,
} from "../repositories/user.repository.js";
import { resend } from "../lib/resend.js";
import { getJwtToken } from "../lib/getJwtToken.js";
import { env } from "../lib/env.js";
import type { User } from "../middleware/auth.middleware.js";

function parseMagicLinkBody(body: unknown) {
    const parsed = generateMagicLinkSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError(
            "Please provide valid email address",
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}

function parseQueryParams(query: unknown) {
    const parsed = queryParamsSchema.safeParse(query);

    if (!parsed.success) {
        throw new ValidationError("Token is missing", getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

export async function generateMagicLink(req: Request, res: Response) {
    const input = parseMagicLinkBody(req.body);

    const secretKey = env.JWT_MAGIC_LINK_SECRET;

    const token = getJwtToken({ email: input.email }, secretKey, 1000 * 60 * 10);

    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 10); // 10 min

    await createMagicLink(token, tokenExpiry);

    await resend.emails.send({
        from: env.MAIL_FROM,
        to: input.email,
        template: {
            id: "magic-link-sign-in",
            variables: {
                MAGIC_LINK: `${env.BACKEND_URL}/api/user/authenticate?token=${token}`,
            },
        },
    });

    return res.status(200).json({
        message: "Magic link sent",
        success: true,
    });
}

export async function verifyLink(req: Request, res: Response) {
    const input = parseQueryParams(req.query);

    const record = await getRecordByToken(input.token);

    if (!record) {
        throw new NotFoundError("Token record not found");
    }

    const isTokenValid = record.expiryAt > new Date(Date.now());

    const isTokenUsed = record.usedAt;

    if (!isTokenValid && isTokenUsed) {
        throw new AppError(400, "Either token is being used or expired");
    }

    const secretKey = env.JWT_MAGIC_LINK_SECRET;

    const decodedToken = jwt.verify(input.token, secretKey) as JwtPayload;

    let existingUser = await findUserByEmail(decodedToken.email);

    const secret = env.JWT_SECRET;

    if (!existingUser) {
        existingUser = await createUser(decodedToken.email, true);
    }

    // remove the magiclink from db
    await deleteMagicLink(record.id);

    const token = getJwtToken({ id: existingUser.id }, secret, 1000 * 60 * 60 * 24 * 2);

    res.cookie("jwt_secret", token);

    return res.redirect(`${env.CLIENT_URL}/dashboard`);
}

export async function getUserInfo(req: Request, res: Response) {
    const user = req.user as User;

    return res.status(200).json(user);
}

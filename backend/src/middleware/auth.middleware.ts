import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/error.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../lib/env.js";
import { getUserById } from "../repositories/user.repository.js";

export interface User {
    id: string;
    email: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
    const { jwt_secret: token } = req.cookies;

    if (!token) {
        throw new UnauthorizedError("Unauthorized");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await getUserById(decoded.id);

    if (!user) {
        throw new UnauthorizedError("Unauthorized");
    }

    req.user = user;
    next()
}

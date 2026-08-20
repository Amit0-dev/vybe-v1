import type { Request, Response } from "express";
import {
    createSpaceSchema,
    spaceIdParamSchema,
    updateSpaceSchema,
} from "../validators/space.validators.js";
import { UnauthorizedError, ValidationError } from "../utils/error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
    createSpace as cSpace,
    deleteSpace as dSpace,
    getAllSpaces,
    updateSpace as uSpace,
    findSpaceById,
} from "../repositories/space.repository.js";

export function parseSpaceId(params: Request["params"]) {
    const parsed = spaceIdParamSchema.safeParse(params);

    if (!parsed.success) {
        throw new ValidationError("Invalid space id", getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}
function parseCreateSpaceBody(body: unknown) {
    const parsed = createSpaceSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError("Validation Failed", getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}
function parseUpdateSpaceBody(body: unknown) {
    const parsed = updateSpaceSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError("Validation Failed", getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

export async function createSpace(req: Request, res: Response) {
    const input = parseCreateSpaceBody(req.body);

    const userId = req.user && req.user.id;

    if (!userId) {
        throw new UnauthorizedError("User not authenticated");
    }

    await cSpace({
        name: input.name,
        description: input.description ?? null,
        code: input.code,
        userId: userId,
    });

    return res.status(201).json({ message: "Space created successfully" });
}

export async function getSpaces(req: Request, res: Response) {
    const spaces = await getAllSpaces();
    return res.status(200).json(spaces);
}

export async function getSpaceById(req: Request, res: Response) {
    const { id } = parseSpaceId(req.params);

    const space = await findSpaceById(id);

    if (!space) {
        throw new ValidationError("Space not found");
    }

    return res.status(200).json(space);
}

export async function updateSpace(req: Request, res: Response) {
    const { id } = parseSpaceId(req.params);
    const input = parseUpdateSpaceBody(req.body);

    const updatedBody = {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.code !== undefined && { code: input.code }),
    };

    await uSpace(id, updatedBody);
}

export async function deleteSpace(req: Request, res: Response) {
    const { id } = parseSpaceId(req.params);

    await dSpace(id);

    return res.status(200).json({ message: "Space deleted successfully" });
}

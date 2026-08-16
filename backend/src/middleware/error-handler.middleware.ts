import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";
import { ZodError } from "zod";
import { getZodFieldErrors } from "../utils/zod-error";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.message,
            ...(error.details ? { details: error.details } : {}),
        });

        return;
    }

    if (error instanceof ZodError) {
        res.status(400).json({
            error: "Validation failed",
            details: getZodFieldErrors(error),
        });
        return;
    }

    res.status(500).json({ error: "Internal server error" });
}

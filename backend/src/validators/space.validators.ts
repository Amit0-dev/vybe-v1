import { z } from "zod";

export const createSpaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters"),
    description: z.string().trim().optional(),
    code: z.string().trim().min(1, "Code is required").max(6, "Code must be at most 6 characters"),
});

export const updateSpaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters")
        .optional(),
    description: z.string().trim().optional(),
    code: z
        .string()
        .trim()
        .min(1, "Code is required")
        .max(6, "Code must be at most 6 characters")
        .optional(),
});

export const spaceIdParamSchema = z.object({
    id: z.string().trim().min(1, "Space ID is required"),
});

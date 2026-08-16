import { z } from "zod";

export const generateMagicLinkSchema = z.object({
    email: z.email("Please provide a valid email"),
});

export const queryParamsSchema = z.object({
    token: z.string().trim().min(1, "Token is missing"),
});

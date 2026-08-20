import { z } from "zod";
export const YT_REGEX = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?[^#]*?v=([a-zA-Z0-9_-]{11})(?:[&#].*)?$/;

export const addVideoSchema = z.object({
    videoUrl: z.string().trim().regex(YT_REGEX, "Invalid yt url"),
});
export const updateUpVoteSchema = z.object({
    up: z.boolean("Invalid").optional(),
    down: z.boolean("Invalid").optional(),
});

export const paramsSchema = z.object({
    spaceId: z.string().trim().min(1, "Space ID is required"),
    videoId: z.string().trim().min(1, "Video ID is required"),
});

import type { Request, Response } from "express";
import {
    addVideoSchema,
    paramsSchema,
    updateUpVoteSchema,
    YT_REGEX,
} from "../validators/video.validators";
import { AppError, ConflictError, UnauthorizedError, ValidationError } from "../utils/error";
import { getZodFieldErrors } from "../utils/zod-error";
import { parseSpaceId } from "./space.controller";
import {
    getVideo,
    addVideo as aVideo,
    incrementUpVote,
    decrementUpVote,
    removeVideo as rVideo,
    getAllVideosBySpaceId,
} from "../repositories/video.repository";

function parseAddVideoBody(body: unknown) {
    const parsed = addVideoSchema.safeParse(body);

    if (!parsed.success) {
        throw (new ValidationError("Invalid req body"), getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

function parseUpdateBody(body: unknown) {
    const parsed = updateUpVoteSchema.safeParse(body);

    if (!parsed.success) {
        throw (new ValidationError("Invalid req body"), getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

function parseSpaceAndVideoId(params: Request["params"]) {
    const parsed = paramsSchema.safeParse(params);

    if (!parsed.success) {
        throw (new ValidationError("Invalid params"), getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

export async function addVideo(req: Request, res: Response) {
    const input = parseSpaceId(req.params);
    console.log(req.body)
    const body = parseAddVideoBody(req.body);

    const match = YT_REGEX.exec(body.url);
    const videoId = match?.[1];

    if (!videoId) {
        throw new AppError(400, "VideoId is missing");
    }

    const alreadyExists = await getVideo({ videoId, spaceId: input.id });

    if (alreadyExists) {
        throw new ConflictError("Video already exists in this space");
    }

    await aVideo({
        addedBy: req.user?.id!,
        spaceId: input.id,
        videoId,
    });

    return res.status(201).json({ message: "Video added" });
}
export async function removeVideo(req: Request, res: Response) {
    const input = parseSpaceAndVideoId(req.params);

    const spaceId = input.id;
    const videoId = input.videoId;

    const video = await getVideo({ spaceId, videoId });
console.log(video)
    if (!video) {
        throw new AppError(400, "Invalid Id");
    }

    const isVideoBelongToUser = video.addedBy === req.user?.id;

    if (!isVideoBelongToUser) {
        throw new UnauthorizedError("You can not delete this video");
    }

    await rVideo(videoId, spaceId);

    return res.status(200).json({ message: "video deleted" });
}
export async function updateUpVote(req: Request, res: Response) {
    const input = parseSpaceAndVideoId(req.params);
    const body = parseUpdateBody(req.body);

    const video = await getVideo({ spaceId: input.id, videoId: input.videoId });

    if (!video) {
        throw new AppError(400, "Invalid Id");
    }

    if (body.up) {
        await incrementUpVote(input.videoId, input.id);
    } else if (body.down) {
        await decrementUpVote(input.videoId, input.id);
    }

    return res.status(200).json({ message: "success" });
}

export async function getVideos(req: Request, res: Response) {
    const input = parseSpaceId(req.params);
    const videos = await getAllVideosBySpaceId(input.id);

    return res.status(200).json(videos);
}

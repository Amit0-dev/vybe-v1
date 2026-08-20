import prisma from "../lib/db";

export function getVideo({ videoId, spaceId }: { videoId: string; spaceId: string }) {
    return prisma.video.findUnique({
        where: {
            videoId_spaceId: {
                videoId,
                spaceId,
            },
        },
    });
}

export function getAllVideosBySpaceId(spaceId: string) {
    return prisma.video.findMany({
        where: { spaceId },
    });
}

interface VideoInput {
    videoId: string;
    spaceId: string;
    addedBy: string;
    upVote?: number;
}

export function addVideo(data: VideoInput) {
    return prisma.video.create({
        data: {
            videoId: data.videoId,
            spaceId: data.spaceId,
            addedBy: data.addedBy,
            upVote: data.upVote ?? 0,
        },
    });
}

export function incrementUpVote(videoId: string, spaceId: string) {
    return prisma.video.update({
        where: {
            videoId_spaceId: {
                videoId,
                spaceId,
            },
        },
        data: {
            upVote: { increment: 1 },
        },
    });
}

export function decrementUpVote(videoId: string, spaceId: string) {
    return prisma.video.update({
        where: {
            videoId_spaceId: {
                videoId,
                spaceId,
            },
        },
        data: {
            upVote: { decrement: 1 },
        },
    });
}

export function removeVideo(videoId: string, spaceId: string) {
    return prisma.video.delete({
        where: {
            videoId_spaceId: { videoId, spaceId },
        },
    });
}

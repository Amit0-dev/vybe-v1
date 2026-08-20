import { apiClient } from "@/lib/api-client";

export interface Video {
    id: string;
    videoId: string;
    spaceId: string;
    upVote: number;
    addedBy: string;
    createdAt: Date;
    updatedAt: Date;
    owner: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        isEmailVerified: boolean;
    };
}

export async function getVideos({ spaceId }: { spaceId: string }): Promise<Video[]> {
    const res = await apiClient.get(`/space/${spaceId}/video/`);
    return res.data;
}

export async function addVideo({ url, spaceId }: { url: string; spaceId: string }) {
    const res = await apiClient.post(`/space/${spaceId}/video/`, {url});
    return res.data;
}

export async function updateUpVote(data: {
    up?: boolean;
    down?: boolean;
    spaceId: string;
    videoId: string;
}) {
    const body = {
        ...(data.up !== undefined ? { up: data.up } : {}),
        ...(data.down !== undefined ? { down: data.down } : {}),
    };

    const res = await apiClient.put(`/space/${data.spaceId}/video/${data.videoId}`, body);
    return res.data;
}

export async function removeVideo({ spaceId, videoId }: { spaceId: string; videoId: string }) {
    const res = await apiClient.delete(`/space/${spaceId}/video/${videoId}`);
    return res.data;
}

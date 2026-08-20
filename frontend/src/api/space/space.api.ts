import { apiClient } from "@/lib/api-client";

export async function createSpace(data: { name: string; description?: string; code: string }) {
    const res = await apiClient.post("/space/", data);
    return res.data;
}

export async function getSpaces() {
    const res = await apiClient.get("/space/");
    return res.data;
}

export async function getSpaceById(id: string) {
    const res = await apiClient.get(`/space/${id}`);
    return res.data;
}

type UpdateInput = {
    id: string;
    data: {
        name?: string;
        description?: string;
        code?: string;
    };
};


export async function updateSpace(input: UpdateInput) {
    const res = await apiClient.put(`/space/${input.id}`, input.data);
    return res.data;
}

export async function deleteSpace(id: string) {
    const res = await apiClient.delete(`/space/${id}`);
    return res.data;
}

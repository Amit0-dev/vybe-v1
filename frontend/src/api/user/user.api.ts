import { apiClient } from "@/lib/api-client";
import axios from "axios";

export interface User {
    id: string;
    email: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUser(): Promise<User | null> {
    try {
        const res = await apiClient.get("/user/info");
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response?.status === 401) {
            return null
        }

        throw error
    }
}

export async function generateMagicLink(data: {email: string}) {
    const res = await apiClient.post("/user/", data);
    return res.data;
}

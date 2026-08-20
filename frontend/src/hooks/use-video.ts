import { addVideo, getVideos, removeVideo, updateUpVote, type Video } from "@/api/video/video.api";
import { queryClient } from "@/lib/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useVideos(spaceId: string){
    return useQuery({
        queryKey: ["videos", spaceId],
        queryFn: () => getVideos({ spaceId }),
        retry: 2,
    });
}

export function useAddVideo(spaceId: string) {
    return useMutation({
        mutationFn: addVideo,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos", spaceId] });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

export function useUpdateUpVote(spaceId: string) {
    return useMutation({
        mutationFn: updateUpVote,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos", spaceId] });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

export function useRemoveVideo(spaceId: string) {
    return useMutation({
        mutationFn: removeVideo,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos", spaceId] });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

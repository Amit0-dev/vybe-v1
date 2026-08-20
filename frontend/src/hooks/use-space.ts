import { createSpace, getSpaces, updateSpace } from "@/api/space/space.api";
import { queryClient } from "@/lib/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useSpaces() {
    return useQuery({
        queryKey: ["spaces"],
        queryFn: getSpaces,
    });
}

export function useCreateSpace() {
    return useMutation({
        mutationFn: createSpace,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

export function useUpdateSpace() {
    return useMutation({
        mutationFn: updateSpace,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

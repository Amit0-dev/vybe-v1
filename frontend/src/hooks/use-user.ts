import { generateMagicLink, getUser } from "@/api/user/user.api";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";



export const userQuery = queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
});

export function useUser() {
    return useQuery(userQuery);
}

export function useGenerateMagicLink() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: generateMagicLink,

        onSuccess: () => {
            navigate({ to: "/info" });
        },

        onError: (err) => {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error;
                toast.error(error);
            }
        },
    });
}

import { userQuery } from "@/hooks/use-user";
import { queryClient } from "@/lib/query-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    beforeLoad: async ({ location }) => {
        const user = await queryClient.ensureQueryData(userQuery);

        console.log("User : ", user);

        if (!user) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }

        return { user };
    },
});

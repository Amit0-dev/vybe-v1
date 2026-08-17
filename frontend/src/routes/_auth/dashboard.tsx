import { createFileRoute, getRouteApi } from "@tanstack/react-router";

const authRoute = getRouteApi("/_auth")

export const Route = createFileRoute("/_auth/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
   const { user } = authRoute.useRouteContext();

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            {JSON.stringify(user)}
        </div>
    );
}

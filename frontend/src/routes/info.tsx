import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/info")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            Check your email for the login url
        </div>
    );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/space/$spaceId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { spaceId } = Route.useParams();
    return (
        <div>
            <h1>Welcome to space {spaceId}</h1>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-4xl font-bold">Welcome to Muser</h1>
            <Link to="/login" className="mt-4">
                <Button variant={"default"} className={"p-6"}>Login</Button>
            </Link>
        </div>
    );
}

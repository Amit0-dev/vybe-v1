import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSpace, useSpaces } from "@/hooks/use-space";
import { useState } from "react";

const authRoute = getRouteApi("/_auth");

export const Route = createFileRoute("/_auth/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    authRoute.useRouteContext();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [spaceData, setSpaceData] = useState({
        name: "",
        description: "",
        code: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setSpaceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const createSpaceMutation = useCreateSpace();
    const { data, isLoading, error } = useSpaces();
    const navigate = useNavigate();

    function handleCreateSpace(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createSpaceMutation.mutate(
            {
                name: spaceData.name,
                description: spaceData.description,
                code: spaceData.code,
            },
            {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    setSpaceData({ name: "", description: "", code: "" });
                },
            },
        );
    }

    function handleGenerateCode() {
        const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const generatedCode = Array.from(
            { length: 6 },
            () => characters[Math.floor(Math.random() * characters.length)],
        ).join("");

        setSpaceData((prevData) => ({ ...prevData, code: generatedCode }));
    }

    return (
        <div className="min-h-screen w-full p-6 sm:p-10">
            <Button className="p-4" onClick={() => setIsCreateModalOpen(true)}>
                Create Space
            </Button>

            {isCreateModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/35 p-4 backdrop-blur-sm"
                    role="presentation"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setIsCreateModalOpen(false);
                    }}
                >
                    <div
                        aria-labelledby="create-space-title"
                        aria-modal="true"
                        className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
                        role="dialog"
                    >
                        <div className="mb-6">
                            <h2
                                id="create-space-title"
                                className="font-heading text-xl font-semibold"
                            >
                                Create a space
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Set up a shared place for your work and ideas.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleCreateSpace}>
                            <div className="space-y-2">
                                <Label htmlFor="space-name">Name</Label>
                                <Input
                                    id="space-name"
                                    name="name"
                                    onChange={handleInputChange}
                                    placeholder="e.g. Product Design"
                                    required
                                    value={spaceData.name}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="space-description">Description (optional)</Label>
                                <textarea
                                    className="min-h-24 w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    id="space-description"
                                    name="description"
                                    onChange={handleInputChange}
                                    placeholder="What will this space be used for?"
                                    value={spaceData.description}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="space-code">Access code</Label>
                                <div className="flex gap-2">
                                    <Input
                                        className="font-mono uppercase tracking-widest"
                                        id="space-code"
                                        name="code"
                                        onChange={handleInputChange}
                                        placeholder="ABC123"
                                        required
                                        value={spaceData.code}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleGenerateCode}
                                    >
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={createSpaceMutation.isPending} type="submit">
                                    {createSpaceMutation.isPending ? "Creating..." : "Create Space"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <p>Loading spaces...</p>
                ) : error ? (
                    <p>Error loading spaces: {error.message}</p>
                ) : (
                    data?.map((space: { id: string; name: string; desc: string }) => (
                        <Card
                            onClick={() => {
                                navigate({ to: `/space/${space.id}` });
                            }}
                            key={space.id}
                            className="cursor-pointer"
                        >
                            <CardHeader>
                                <CardTitle>{space.name}</CardTitle>
                                <CardDescription>{space.desc}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

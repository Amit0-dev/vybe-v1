import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useGenerateMagicLink } from "@/hooks/use-user";

export const Route = createFileRoute("/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState<string>("");

    const generateMagicLinkMutation = useGenerateMagicLink();

    function handleSubmit() {
        generateMagicLinkMutation.mutate({email});
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        disabled={generateMagicLinkMutation.isPending}
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

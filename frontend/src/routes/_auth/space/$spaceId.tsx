import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { useMemo, useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddVideo, useRemoveVideo, useUpdateUpVote, useVideos } from "@/hooks/use-video";
import { YTPlayer } from "@/components/ui/ytPlayer";
import type { Video } from "@/api/video/video.api";

export const Route = createFileRoute("/_auth/space/$spaceId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { spaceId } = Route.useParams();
    const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const { data, isLoading, error } = useVideos(spaceId);

    const videoQueue: Video[] = useMemo(() => {
        if (!isLoading && !error && data) {
            return data.sort((a, b) => b.upVote - a.upVote);
        }

        return [];
    }, [data]);

    const addVideoMutation = useAddVideo(spaceId);
    const updateVideoMutation = useUpdateUpVote(spaceId);
    const removeVideoMutation = useRemoveVideo(spaceId);

    function addVideo(e: SubmitEvent) {
        e.preventDefault();

        addVideoMutation.mutate(
            {
                spaceId,
                url: videoUrl,
            },
            {
                onSuccess: (data) => {
                    setIsAddVideoOpen(false);
                    console.log(data);
                },
            },
        );
    }

    return (
        <main className="min-h-screen bg-[#eef1ef] px-4 py-6 text-[#182322] sm:px-8 sm:py-10 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <section className="overflow-hidden rounded-2xl border border-[#d7e0dc] bg-white shadow-[0_20px_60px_-35px_rgba(24,57,51,0.35)]">
                    <div className="flex items-center justify-between border-b border-[#e5ebe8] px-5 py-4 sm:px-7">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs text-[#84918e]">
                                    {data?.length ?? 0} videos in the queue
                                </p>
                            </div>
                        </div>
                        <button
                            aria-label="Add a video"
                            className="flex size-9 items-center justify-center rounded-lg border border-[#dbe4e0] text-[#58716c] transition-colors hover:bg-[#f0f6f3] hover:text-[#183b36]"
                            onClick={() => setIsAddVideoOpen(true)}
                            type="button"
                        >
                            <Plus className="size-4" />
                        </button>
                    </div>

                    <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:gap-10">
                        <aside className="min-w-0 lg:border-l lg:border-[#e5ebe8] lg:pl-8">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-heading text-lg font-semibold">Up next</h3>
                                    <p className="mt-1 text-xs text-[#84918e]">Queue order</p>
                                </div>
                                <Clock3 className="size-4 text-[#9aa8a4]" />
                            </div>
                            <div className="space-y-2">
                                {isLoading ? (
                                    <p>Loading videos...</p>
                                ) : error ? (
                                    <p>Error loading videos: {error.message}</p>
                                ) : (
                                    videoQueue &&
                                    videoQueue.map((video, index) => (
                                        <div
                                            className={`flex gap-3 rounded-xl p-2.5 hover:bg-[#f5f8f7]`}
                                            key={video.id}
                                        >
                                            <span className="w-4 pt-3 text-center text-xs font-medium text-[#9aa8a4]">
                                                {index + 1}
                                            </span>

                                            <div className="min-w-0 flex-1 self-center">
                                                <p
                                                    className={`line-clamp-2 text-sm font-medium leading-snug`}
                                                >
                                                    {video.videoId}
                                                </p>
                                                <p className="mt-1 truncate text-xs text-[#8a9995]">
                                                    {video.owner.email}
                                                </p>

                                                <span className="text-xs font-semibold tabular-nums text-[#58716c]">
                                                    {video.upVote}
                                                </span>
                                            </div>
                                            <div className="flex shrink-0 flex-col items-center gap-1 self-center">
                                                <button
                                                    aria-label={`Upvote ${video.videoId}`}
                                                    className="flex size-7 items-center justify-center rounded-md text-[#7c8d88] transition-colors hover:bg-[#e4f1ed] hover:text-[#287c6e]"
                                                    onClick={() => {
                                                        updateVideoMutation.mutate({
                                                            spaceId,
                                                            videoId: video.videoId,
                                                            up: true,
                                                        });
                                                    }}
                                                    type="button"
                                                >
                                                    <ThumbsUp className="size-4" />
                                                </button>
                                                <button
                                                    aria-label={`Downvote ${video.videoId}`}
                                                    className="flex size-7 items-center justify-center rounded-md text-[#7c8d88] transition-colors hover:bg-[#f7e8e5] hover:text-[#bd5f53]"
                                                    onClick={() => {
                                                        updateVideoMutation.mutate({
                                                            spaceId,
                                                            videoId: video.videoId,
                                                            down: true,
                                                        });
                                                    }}
                                                    type="button"
                                                >
                                                    <ThumbsDown className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </aside>

                        <div className="min-w-0 h-full">
                            <div className="group relative h-full min-h-56 w-full overflow-hidden rounded-xl border border-[#dbe4e0] bg-[#f5f8f7] shadow-[0_20px_60px_-35px_rgba(24,57,51,0.35)]">
                                {!isLoading && !error && videoQueue && videoQueue?.length > 0 && (
                                    <YTPlayer
                                        videoId={videoQueue[0].videoId}
                                        onEnd={() => {
                                            removeVideoMutation.mutate({
                                                spaceId,
                                                videoId: videoQueue[0].videoId,
                                            });
                                        }}
                                        className="h-full"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {isAddVideoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#10221f]/35 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setIsAddVideoOpen(false);
                    }}
                    role="presentation"
                >
                    <div
                        aria-labelledby="add-video-title"
                        aria-modal="true"
                        className="w-full max-w-md rounded-2xl border border-[#d7e0dc] bg-white p-6 text-[#182322] shadow-2xl"
                        role="dialog"
                    >
                        <div className="mb-6">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2f8178]">
                                Add to queue
                            </p>
                            <h2
                                className="font-heading text-2xl font-semibold"
                                id="add-video-title"
                            >
                                Bring a video along
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-[#71807c]">
                                Paste a YouTube link and it will be ready for the room.
                            </p>
                        </div>

                        <form onSubmit={addVideo}>
                            <div className="space-y-2">
                                <Label htmlFor="youtube-url">YouTube URL</Label>
                                <Input
                                    autoFocus
                                    id="youtube-url"
                                    onChange={(event) => setVideoUrl(event.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    type="url"
                                    value={videoUrl}
                                />
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <Button
                                    onClick={() => setIsAddVideoOpen(false)}
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                                <Button disabled={!videoUrl.trim()} type="submit">
                                    Add video
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

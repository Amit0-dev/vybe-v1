import clsx from "clsx";
import ReactPlayer, { type YouTubeEvent } from "react-youtube";

export const YTPlayer = ({
    videoId,
    onEnd,
    className,
}: {
    videoId: string;
    onEnd: (event: YouTubeEvent<number>) => void;
    className?: string;
}) => {
    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <ReactPlayer loading="lazy" opts={opts} videoId={videoId} onEnd={onEnd} className={clsx(`${className}`)} />
    );
};

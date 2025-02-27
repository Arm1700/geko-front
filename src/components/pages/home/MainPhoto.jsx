import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function MainPhoto() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const videoElement = document.getElementById("main-video");
        const handleLoadedData = () => setLoading(false);

        videoElement.addEventListener("loadeddata", handleLoadedData);
        return () => {
            videoElement.removeEventListener("loadeddata", handleLoadedData);
        };
    }, []);

    return (
        <section className="flex uppercase justify-center flex-col text-pseudo overflow-hidden">
            {loading && (
                <Skeleton height={500} width="100%" />
            )}
            <video
                id="main-video"
                autoPlay
                muted
                loop
                preload="auto"
                playsInline
                className="md:absolute top-0 left-0 min-w-full md:h-full object-cover pointer-events-none"
            >
                <source src="/images/main.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
}

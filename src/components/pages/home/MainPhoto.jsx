import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";

export default function MainPhoto() {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedData = () => setLoading(false);
        videoElement.addEventListener("loadeddata", handleLoadedData);

        return () => {
            videoElement.removeEventListener("loadeddata", handleLoadedData);
        };
    }, []);

    return (
        <section className="flex uppercase justify-center flex-col text-pseudo overflow-hidden">
            {loading && <Skeleton height={500} width="100%" />}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                preload="auto"
                playsInline
                className="md:absolute top-0 left-0 min-w-full md:h-full object-cover pointer-events-none"
            >
                <source src="/videos/main.webm" type="video/webm" />
                <source src="/videos/main2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
}

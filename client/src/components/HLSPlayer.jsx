import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import Hls from "hls.js";

const HLSPlayer = forwardRef(({ src, isPlaying, onError, onLoaded }, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (!video) return;

    if (Hls.isSupported()) {
      hls = new Hls();

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.log("HLS error:", data);
        if (data.fatal) onError?.(data);
      });

      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    const handleCanPlay = () => onLoaded?.();
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      if (hls) hls.destroy();
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) video.play().catch(() => {});
    else video.pause();
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      muted
      playsInline
      controls={false}
      autoPlay
    />
  );
});

export default HLSPlayer;

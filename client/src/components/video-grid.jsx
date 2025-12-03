import { useRef, useEffect, useState } from "react";
import VideoTile from "./video-title";

export default function VideoGrid({ isPlaying }) {
  const [fullscreenId, setFullscreenId] = useState(null);
  const videoRefs = useRef({});

  const cameras = [
    { id: 1, label: "Camera 1", location: "Entrance" },
    { id: 2, label: "Camera 2", location: "Lobby" },
    { id: 3, label: "Camera 3", location: "Hallway A" },
    { id: 4, label: "Camera 4", location: "Hallway B" },
    { id: 5, label: "Camera 5", location: "Storage" },
    { id: 6, label: "Camera 6", location: "Exit" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const master = videoRefs.current[1];
      if (!master || master.readyState < 2) return;

      const masterTime = master.currentTime;

      for (let i = 2; i <= 6; i++) {
        const slave = videoRefs.current[i];
        if (!slave || slave.readyState < 2) continue;

        const drift = Math.abs(slave.currentTime - masterTime);

        if (drift > 0.25) {
          slave.currentTime = masterTime;
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cameras.map((cam) => (
        <VideoTile
          key={cam.id}
          id={cam.id}
          label={cam.label}
          location={cam.location}
          isPlaying={isPlaying}
          isFullscreen={fullscreenId === cam.id}
          onFullscreenChange={(id) =>
            setFullscreenId(fullscreenId === id ? null : id)
          }
          ref={(el) => (videoRefs.current[cam.id] = el)}
        />
      ))}
    </div>
  );
}

import { useState } from "react"
import VideoTile from "./video-title"

export default function VideoGrid({ isPlaying, syncKey }) {
  const [fullscreenId, setFullscreenId] = useState(null)

  const cameras = [
    { id: 1, label: "Camera 1", location: "Entrance" },
    { id: 2, label: "Camera 2", location: "Lobby" },
    { id: 3, label: "Camera 3", location: "Hallway A" },
    { id: 4, label: "Camera 4", location: "Hallway B" },
    { id: 5, label: "Camera 5", location: "Storage" },
    { id: 6, label: "Camera 6", location: "Exit" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cameras.map((camera) => (
        <VideoTile
          key={camera.id}
          id={camera.id}
          label={camera.label}
          location={camera.location}
          isPlaying={isPlaying}
          isFullscreen={fullscreenId === camera.id}
          onFullscreenChange={(id) => setFullscreenId(fullscreenId === id ? null : id)}
        />
      ))}
    </div>
  )
}

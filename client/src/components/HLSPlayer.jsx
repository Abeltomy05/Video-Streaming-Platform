import { useEffect, useRef } from "react"
import Hls from "hls.js"

export default function HLSPlayer({ src, isPlaying, onError, onLoaded }) {
  const videoRef = useRef(null)

  // Load HLS
  useEffect(() => {
    const video = videoRef.current
    let hls

    if (!video) return

    if (Hls.isSupported()) {
      hls = new Hls()

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) onError?.(data)
      })

      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src
    }

    return () => hls?.destroy()
  }, [src])

  // Play/pause sync
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    isPlaying ? video.play().catch(() => {}) : video.pause()
  }, [isPlaying])

  // Detect when stream is actually ready
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => onLoaded?.()

    video.addEventListener("canplay", handleCanPlay)
    return () => video.removeEventListener("canplay", handleCanPlay)
  }, [])

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      autoPlay
      muted
      playsInline
    />
  )
}

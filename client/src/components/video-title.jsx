import { useState } from "react"
import { Maximize2, Minimize2, AlertCircle } from "lucide-react"
import HLSPlayer from "./HLSPlayer"

export default function VideoTile({ id, label, location, isPlaying, isFullscreen, onFullscreenChange }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
  }

  const handleStreamLoaded = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const hlsUrl = `http://localhost:8888/cam${id}/index.m3u8`

  return (
    <div
      className={`group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 transition-all duration-300 hover:border-slate-600 ${
        isFullscreen ? "col-span-1 md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Video Area */}
      <div className="relative w-full bg-black aspect-video overflow-hidden">

        {/* HLS Player */}
        <HLSPlayer
          src={hlsUrl}
          isPlaying={isPlaying}
          onError={() => setHasError(true)}
          onLoaded={handleStreamLoaded}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-cyan-500 animate-spin"></div>
            <p className="text-sm text-slate-300 mt-4">Loading Stream...</p>
          </div>
        )}

        {/* Error Overlay */}
        {hasError && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-white font-medium">Stream Error</p>
            <p className="text-sm text-slate-400 mb-4">Unable to load stream.</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={() => onFullscreenChange(id)}
          className="absolute top-3 right-3 z-30 p-2 bg-slate-900/80 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-800 text-slate-300"
        >
          {isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </button>

        {/* Status Label */}
        {!isLoading && !hasError && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-700 rounded-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-slate-300">{isPlaying ? "Playing" : "Paused"}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-900/50 border-t border-slate-700 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm">{label}</h3>
            <p className="text-xs text-slate-400">{location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Live Feed</p>
            <p className="text-xs text-cyan-400 font-medium">1080p</p>
          </div>
        </div>
      </div>
    </div>
  )
}

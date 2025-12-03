import { useState, useEffect } from "react"
import { Maximize2, Minimize2, AlertCircle } from "lucide-react"

export default function VideoTile({ id, label, location, isPlaying, isFullscreen, onFullscreenChange }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setLoadingProgress(0)

    // Simulate loading with progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(loadingInterval)
          return prev
        }
        return prev + Math.random() * 30
      })
    }, 200)

    // Simulate stream loading complete
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      setLoadingProgress(100)
      clearInterval(loadingInterval)
    }, 1500)

    return () => {
      clearTimeout(loadingTimer)
      clearInterval(loadingInterval)
    }
  }, [isPlaying])

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    setLoadingProgress(0)
  }

  // Randomly simulate stream errors for demo purposes
  useEffect(() => {
    const errorChance = Math.random()
    if (errorChance > 0.85 && !isLoading) {
      setHasError(true)
    }
  }, [isLoading])

  return (
    <div
      className={`group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 transition-all duration-300 hover:border-slate-600 ${
        isFullscreen ? "col-span-1 md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Video Player Area */}
      <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
        {/* Background gradient placeholder */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-950" />

        {/* HLS Stream Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin mb-4 mx-auto" />
            <div className="text-sm text-slate-400">{label} Stream</div>
            <div className="text-xs text-slate-500 mt-1">HLS Player Placeholder</div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="flex flex-col items-center gap-4 w-full px-4">
              <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-cyan-500 animate-spin" />
              <div className="w-full max-w-xs">
                <p className="text-sm text-slate-300 mb-2 text-center">Loading Stream</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {hasError && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <p className="text-white font-medium">Stream Connection Failed</p>
                <p className="text-sm text-slate-400 mt-1">Unable to load stream. Please try again.</p>
              </div>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={() => onFullscreenChange(id)}
          className="absolute top-3 right-3 z-30 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-slate-700"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Playing Indicator */}
        {!isLoading && !hasError && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 rounded-lg border border-slate-700 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">{isPlaying ? "Playing" : "Paused"}</span>
          </div>
        )}
      </div>

      {/* Camera Info Footer */}
      <div className="bg-slate-900/50 border-t border-slate-700 p-4 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-white text-sm">{label}</h3>
            <p className="text-xs text-slate-400 mt-1">{location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Live Feed</p>
            <p className="text-xs text-cyan-400 font-medium mt-0.5">1080p</p>
          </div>
        </div>
      </div>
    </div>
  )
}

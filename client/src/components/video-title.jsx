import { forwardRef, useState } from "react";
import { Maximize2, Minimize2, AlertCircle } from "lucide-react";
import HLSPlayer from "./HLSPlayer";

const VideoTile = forwardRef(
  ({ id, label, location, isPlaying, isFullscreen, onFullscreenChange }, videoRef) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleRetry = () => {
      setHasError(false);
      setIsLoading(true);
    };

    const handleLoaded = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const hlsUrl = `/api/stream/cam${id}/index.m3u8`;

    return (
      <div
        className={`group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 ${
          isFullscreen ? "col-span-1 md:col-span-2 lg:col-span-3" : ""
        }`}
      >
        <div className="relative w-full bg-black aspect-video overflow-hidden">

          {/* HLS Player */}
          <HLSPlayer
            ref={videoRef}
            src={hlsUrl}
            isPlaying={isPlaying}
            onError={() => setHasError(true)}
            onLoaded={handleLoaded}
          />

          {/* -------- Loading Overlay -------- */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">

              {/* pointer-events-auto ensures button inside works (if any) */}
              <div className="pointer-events-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-cyan-500 animate-spin" />
                <p className="text-sm text-slate-300 mt-4">Loading Stream...</p>
              </div>

            </div>
          )}

          {/* -------- Error Overlay -------- */}
          {hasError && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">

              {/* pointer-events-auto so Retry button works */}
              <div className="pointer-events-auto text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4 mx-auto" />
                <p className="text-white font-medium">Stream Error</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 mt-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
                >
                  Retry
                </button>
              </div>

            </div>
          )}

          {/* -------- Fullscreen Button -------- */}
          <button
            onClick={() => onFullscreenChange(id)}
            className="absolute top-3 right-3 z-30 p-2 rounded-lg bg-slate-900/80 
                       text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-800 
                       transition"
          >
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-900/50 border-t border-slate-700 p-4">
          <h3 className="text-white font-semibold text-sm">{label}</h3>
          <p className="text-xs text-slate-400">{location}</p>
        </div>
      </div>
    );
  }
);

export default VideoTile;

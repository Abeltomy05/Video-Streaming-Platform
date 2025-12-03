import { Play, Pause, RefreshCw } from "lucide-react"

export default function SyncControls({ onPlayAll, onPauseAll, onReSyncStreams, isPlaying }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between backdrop-blur-sm">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onPlayAll}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border ${
            isPlaying
              ? "bg-cyan-600 border-cyan-500 text-white hover:bg-cyan-700"
              : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Play className="w-4 h-4" />
          Play All
        </button>

        <button
          onClick={onPauseAll}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border ${
            !isPlaying
              ? "bg-cyan-600 border-cyan-500 text-white hover:bg-cyan-700"
              : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Pause className="w-4 h-4" />
          Pause All
        </button>

        <button
          onClick={onReSyncStreams}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Re-Sync Streams
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg text-xs text-slate-300 border border-slate-600">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>6 Streams Active</span>
      </div>
    </div>
  )
}

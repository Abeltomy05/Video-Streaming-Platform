import { useState } from "react"
import Header from "@/components/header"
import SyncControls from "../components/sync-control"
import VideoGrid from "../components/video-grid"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [syncKey, setSyncKey] = useState(0)

  const handlePlayAll = () => {
    setIsPlaying(true)
  }

  const handlePauseAll = () => {
    setIsPlaying(false)
  }

  const handleReSyncStreams = () => {
    setSyncKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <SyncControls
            onPlayAll={handlePlayAll}
            onPauseAll={handlePauseAll}
            onReSyncStreams={handleReSyncStreams}
            isPlaying={isPlaying}
          />

          <VideoGrid isPlaying={isPlaying} syncKey={syncKey} />
        </div>
      </main>
    </div>
  )
}

import { useState } from "react"
import Header from "@/components/header"
import SyncControls from "../components/sync-control"
import VideoGrid from "../components/video-grid"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)

  const handlePlayAll = () => {
    setIsPlaying(true)
  }

  const handlePauseAll = () => {
    setIsPlaying(false)
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <SyncControls
            onPlayAll={handlePlayAll}
            onPauseAll={handlePauseAll}
            isPlaying={isPlaying}
          />

          <VideoGrid isPlaying={isPlaying} />
        </div>
      </main>
    </div>
  )
}

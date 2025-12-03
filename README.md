## **Multi-Stream Synchronized Video Dashboard**
This project is a synchronized multi-camera monitoring dashboard built with React + HLS.js, capable of playing 5–6 live HLS streams in tight synchronization.
The system ingests a single RTSP feed, converts it into multiple HLS outputs using MediaMTX, and then displays and synchronizes the streams in the web dashboard.

## **1. RTSP → HLS Conversion (MediaMTX)**
The provided machine-task RTSP source:
```bash
  rtsp://13.60.76.79:8554/live
```
Browsers cannot play RTSP directly, so a media server is required to convert it into HLS (.m3u8).
This project uses MediaMTX.

## **2. Generating 5–6 Distinct HLS Streams (From ONE RTSP Source)**
A key requirement was to produce multiple distinct HLS URLs from a single RTSP feed.

Since a single RTSP input can be processed multiple times, MediaMTX is configured to generate:
```bash
/cam1/index.m3u8
/cam2/index.m3u8
/cam3/index.m3u8
/cam4/index.m3u8
/cam5/index.m3u8
/cam6/index.m3u8
```

All 6 HLS outputs originate from the same video feed, but each is treated as an independent HLS pipeline, providing:
- Separate buffering
- Separate timestamps

This approach satisfies the machine-task requirement of simulating 5–6 streams even with a single RTSP source.

## **3. Synchronization Logic**
Synchronization is the most critical part of the assignment.
All 6 video streams should play at nearly the same timestamp, with minimal drift.

**Approach Used: Master–Slave Timestamp Correction**
- Camera 1 is the master stream
- Cameras 2–6 are slave streams

Every 250ms, the app:
- Reads the master's currentTime
- Compares each slave’s currentTime
- Computes the drift
- Corrects the drift if it exceeds 0.25s

**Code Summary**
```bash
const master = videoRefs.current[1];
const masterTime = master.currentTime;

for (let i = 2; i <= 6; i++) {
  const slave = videoRefs.current[i];
  const drift = Math.abs(slave.currentTime - masterTime);

  if (drift > 0.25) {
    slave.currentTime = masterTime;
  }
}
```

🎯 **Effect**
- All streams remain aligned within ~150–250ms
- Drift is continuously corrected

## **4. React Component Architecture**
**HLSPlayer.jsx**
- Wraps a <video> element
- Initializes Hls.js
- Handles errors and loading events
- Exposes internal video element via ref
- Allows parent sync controller to access currentTime

**VideoTile.jsx**
- One tile per camera
- Shows loading animations
- Shows error UI
- Contains the HLSPlayer
- Supports fullscreen mode

**VideoGrid.jsx**
- Renders 6 VideoTiles
- Manages refs for synchronization
- Runs the sync loop
- Handles fullscreen state

**Home.jsx**
- Provides play/pause controls
- Passes global playback state to all tiles


## **5. Running the Application**
**1. Install dependencies**
```bash
npm install
```
**2. Start server**
```bash
npm run dev
```
**3. Open in browser**
```bash
http://localhost:5173
```

## **MediaMTX Configuration**

Create or edit your `mediamtx.yml` file with the following configuration:
```yaml
paths:
  cam1:
    source: rtsp://13.60.76.79:8554/live

  cam2:
    source: rtsp://13.60.76.79:8554/live

  cam3:
    source: rtsp://13.60.76.79:8554/live

  cam4:
    source: rtsp://13.60.76.79:8554/live

  cam5:
    source: rtsp://13.60.76.79:8554/live

  cam6:
    source: rtsp://13.60.76.79:8554/live
```
**Resulting HLS URLs**
MediaMTX automatically exposes:
```bash
http://localhost:8888/cam1/index.m3u8
http://localhost:8888/cam2/index.m3u8
....
```

## **Running MediaMTX**

Start the MediaMTX server using your configuration file:

```bash
./mediamtx mediamtx.yml
```

**MediaMTX immediately:**
- pulls the RTSP feed
- generates 6 HLS pipelines
- exposes 6 public .m3u8 URLs

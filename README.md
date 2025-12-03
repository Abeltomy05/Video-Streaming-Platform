## **Multi-Stream Synchronized Video Dashboard**
This project is a synchronized multi-camera monitoring dashboard built with React + HLS.js, capable of playing 5–6 live HLS streams in tight synchronization.
The system ingests a single RTSP feed, converts it into multiple HLS outputs using MediaMTX, and then displays and synchronizes the streams in the web dashboard.

## **1. RTSP → HLS Conversion (MediaMTX)**
The provided machine-task RTSP source:
``bash
  rtsp://13.60.76.79:8554/live

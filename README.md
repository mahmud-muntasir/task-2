# 🛰️ Real-Time Location Sharing App

A real-time location sharing web application built using **Next.js 15**, **Tailwind CSS 4**, **SignalR**, and **Leaflet**. It allows one user to share live GPS coordinates and another to view them in real-time on an interactive map.
> 🌐 Live Site: [https://muntasir-task-2.vercel.app](https://muntasir-task-2.vercel.app)

---

## ⚙️ Setup Instructions
Follow the steps below to run the project locally:

- git clone https://github.com/mahmud-muntasir/task-2.git
- cd task-2
- npm install
- npm run dev

---

## 🛠 Framework & Tools

- Next.js v15 – React framework for full-stack applications
- Tailwind CSS v4 – Utility-first CSS framework for styling
- @microsoft/signalr – Real-time communication (WebSocket)
- Leaflet – Interactive mapping library
- React Leaflet – React bindings for Leaflet maps
- React Icons – Icon library for React components

---

##  ⚠️ Limitations & Tradeoffs

CORS Issue in Production

The app uses a third-party SignalR server: This server does not allow cross-origin requests from the production domain (https://muntasir-task-2.vercel.app). As a result, real-time updates do not work in production.

✅ Works in local development (localhost)
❌ Blocked in production due to missing CORS headers

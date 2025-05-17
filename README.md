# YT Frontend

A React + Vite frontend for browsing videos with filtering, built using Redux Toolkit, React Router, and Tailwind CSS.

---

## Features

- Fetches videos from a backend API
- Displays main video with recommended side videos
- Filters videos by search text and tags
- Responsive UI with Tailwind CSS
- Loading shimmer placeholders while fetching data
- Redux Toolkit for managing search state
- React Router for navigation

---

## Technologies Used

- React 19
- Vite 6
- Redux Toolkit
- React Router 7
- Tailwind CSS 3
- Axios
- React Icons

---

## Getting Started

## LIVE DEMO

https://youdube.netlify.app/

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
git clone https://github.com/nitin-sharma-7/yt_client
cd yt_client
npm install


Run Development Server

 npm run dev


Component Overview

Home.jsx: Fetches and filters videos based on search; displays tags and video cards.

MainVideoPage.jsx: Displays selected video with a sidebar of recommended videos.

SideVideo.jsx: Renders video thumbnail, title, channel info, duration, and views.

HomeVideoCard.jsx & ShimmerVideoCard.jsx: Video display and loading skeleton components.


Author
Nitin Sharma

License
MIT License
```

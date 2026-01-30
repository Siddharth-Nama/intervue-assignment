# Live Polling System (Intervue Assignment)

**Live Application:** [Click Here to Open App](https://intervue-assignment-ivory.vercel.app/)  
**Repository:** [GitHub](https://github.com/Siddharth-Nama/intervue-assignment)  
**Backend API:** [Live Server (Render)](https://intervue-assignment-rza1.onrender.com/)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Overview

Welcome to my submission for the **Intervue Frontend Assignment**. This project is a robust **Real-Time Polling Platform** designed to facilitate seamless interaction between teachers and students with sub-second latency.

I have engineered a complete system that handles live polling, real-time result updates, and state recovery. The project includes a **Frontend (React + Vite)**, a **Backend (Node.js + Express)**, and a **Database (MongoDB)**, all orchestrated to handle race conditions and ensure data consistency.

## Tech Stack

*   **Frontend:** React (Vite) for a lightning-fast UI.
*   **Styling:** Tailwind CSS (v4) with a custom, premium design system.
*   **Real-Time:** `socket.io-client` for instant bidirectional communication.
*   **Backend:** Node.js & Express for a scalable event-driven server.
*   **Database:** MongoDB (Mongoose) with atomic operations.
*   **Tools:** Git/GitHub for version control.

## Why This Project Stands Out?

*   **Resilient Architecture:** The system is built to handle network flakiness. It features **state recovery** (persisting user sessions via LocalStorage) and **timer synchronization**, ensuring late joiners see the correct remaining time.
*   **Architectural Purity:** Strict separation of concerns. The backend handles critical logic like race-condition prevention (using atomic MongoDB `$inc` and `$addToSet` operators), while the frontend focuses on optimistic UI updates and smooth animations.
*   **Premium UI/UX:** Unlike generic dashboards, this interface matches a high-fidelity design specification. Features include animated loaders, smooth transitions, and a responsive layout that works perfectly on mobile devices.
*   **Advanced Engineering:**
    *   **Race Condition Handling:** Uses atomic database operations to guarantee vote integrity even with concurrent requests.
    *   **Timer Synchronization:** Server-authoritative start times prevent client-side clock manipulation.
    *   **Smart History:** Automatically archives polls when their duration expires, keeping the active view clean.

## Implementation Details

### Core Features
*   **Teacher Dashboard:** Create polls with customizable options and durations. View live results updating in real-time.
*   **Student Experience:** Seamless onboarding requiring only a name. "Waiting Room" experience that automatically transitions to the active poll when the teacher starts one.
*   **Mobile Friendly:** Fully responsive design adapting layouts (Sidebar, Charts) for smaller screens.
*   **Poll History:** A comprehensive view of past polls with detailed result breakdowns.

### Visual Logic
*   **Real-time Charts:** Live progress bars showing percentage distribution of votes.
*   **Interactive Feedback:** Instant toast notifications for new polls, votes, and errors.
*   **Detailed Timers:** Precision countdowns synced to the server's expiration time.

## Candidate Profile: Siddharth Nama

*"I don't just write code; I build solutions that scale."*

Hello! I'm **Siddharth Nama**, a passionate Software Engineer Intern from Kota, India. I thrive on solving complex backend challenges and crafting seamless user experiences.

I am fit for this role because I combine strong technical fundamentals with an ownership mindset. I treat every assignment like a production release—focusing on edge cases, maintainability, and user impact.

**Let's Connect:**

*   [LinkedIn](https://www.linkedin.com/in/siddharth-nama)
*   [Twitter](https://x.com/SiddharthNama26) (300+ day public coding streak)
*   **Phone:** +91-8000694996
*   **Email:** siddharthnama.work@gmail.com

---

## Setup Instructions

### Backend Setup
```bash
cd server
npm install
# Create a .env file with PORT and MONGO_URI
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
# Create a .env file with VITE_API_URL=http://localhost:5001
npm run dev
```

## Deployment

The application is deployed and live!
*   **Frontend:** [Vercel Deployment](https://intervue-assignment-ivory.vercel.app/)
*   **Backend:** [Render Deployment](https://intervue-assignment-rza1.onrender.com/)

---
© 2026 Developed by Siddharth Nama

# 👨‍⚕️ Doctor Appointment Booking System

A modern, fast, and responsive full-stack Doctor Appointment & Serial Booking System built with **Next.js (App Router)**, **Prisma**, **SQLite**, and **Tailwind CSS**. It includes automated confirmation emails using **Resend**, real-time UI notifications via **Sonner**, and duplicate slot booking prevention at the database level.

---

## ✨ Features

- 👨‍⚕️ **Doctor & Specialty Selection:** Easily choose doctors and view their medical specialties.
- 📅 **Interactive Date & Time Slot Booking:** Select dates and available time slots dynamically.
- 🔒 **Duplicate Booking Protection:** Prevents double-booking using dynamic database constraints (`doctorId`, `selectedDate`, `selectedSlot`).
- 📧 **Automated Email Confirmations:** Instant email delivery upon successful booking via **Resend**.
- 🔔 **Toast Notifications:** Clean and responsive user feedback powered by **Sonner**.
- ⚡ **Optimized Performance:** Runs efficiently without Turbopack lock errors on Windows development environments.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM:** [SQLite](https://www.sqlite.org/), [Prisma ORM](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Email Service:** [Resend](https://resend.com/)
- **UI Components & Icons:** [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have Node.js (v18+) and `npm` installed on your machine.

### 2. Installation

Clone the repository and install the dependencies:

\`\`\`bash
git clone https://github.com/YOUR_GITHUB_USERNAME/doctor-appointment-booking.git
cd doctor-appointment-booking
npm install
\`\`\`

### 3. Environment Setup

Create a `.env` file in the root directory and add the following keys:

\`\`\`env
DATABASE_URL="file:./dev.db"
RESEND_API_KEY="your_resend_api_key_here"
\`\`\`

### 4. Database Setup

Run Prisma migrations/push to sync your SQLite database schema:

\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

### 5. Run the Development Server

Start the local server using Webpack mode:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📬 Contact & Links

- **Email:** [jahirtawhid1988@gmail.com](mailto:jahirtawhid1988@gmail.com)
- 
- **LinkedIn:** [linkedin.com/in/jahirtawhid](https://linkedin.com/in/jahirtawhid)
- 
- **Live Demo:** 

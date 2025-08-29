---
# Task-6 Fullstack User Management System

This project is a **Fullstack User Management System** developed during my **Saiket Internship**. It demonstrates my skills in **React, Node.js, Express, MongoDB, TailwindCSS**, and deployment using **Render & Vercel**. The system also includes **Docker support** for easier setup and deployment.
---

## Features

- **User Management:** Create, Read, Update, Delete (CRUD) users
- **Roles:** User, Manager, Admin
- **Status Management:** Active, Inactive, Banned
- **User Profile:** Avatar upload and short bio
- **Responsive UI:** Mobile-friendly design with TailwindCSS
- **About Modal:** View detailed user information
- **Dockerized:** Run backend and frontend easily using Docker

---

## Technologies Used

**Frontend:**

- React
- TailwindCSS
- Vite

**Backend:**

- Node.js
- Express.js
- MongoDB (Atlas)
- RESTful API

**Deployment & Containerization:**

- Frontend: Vercel
- Backend: Render
- Docker: For containerized local development and deployment

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Rebira678/Task-6-fullstack-user-manager.git
```

2. **Backend setup (without Docker):**

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and other environment variables
npm start
```

3. **Frontend setup (without Docker):**

```bash
cd frontend
npm install
npm run build
npm run dev
```

4. **Docker setup (optional, recommended):**

```bash
docker-compose up --build
# This will start both backend and frontend in containers
```

---

## Usage

1. Open the frontend in your browser (usually at `http://localhost:5173/`).
2. Manage users using the dashboard:

   - Add new users
   - Edit user information
   - Delete users
   - View detailed user info via the About modal

---

## Demo Video

A demo video showcasing the full functionality is available [https://www.linkedin.com/posts/rebira-adugna-6496b2373_saiketsystemsjourney-saiketexperience-saiketsystems-activity-7367132700119388161-njd_?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAFx5RBkBe6R3XKHOf7g83HTxozwd19yiytE&utm_campaign=copy_link].

---

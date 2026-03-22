# 🚀 VedaAI — AI Assignment Generator

VedaAI is a full-stack AI-powered platform that automatically generates assignments and question papers using intelligent prompt engineering and background job processing.

---

## ✨ Features

* 🧠 AI-based assignment generation
* 📄 Custom question types (MCQ, short answers, etc.)
* ⏳ Background job processing using queues (BullMQ)
* ⚡ Real-time status updates with Socket.IO
* 📊 Assignment status tracking (Pending / Completed / Failed)
* 🗑️ Delete assignments
* 📅 Due date & instructions support
* 🎯 Clean and responsive UI

---

## 🏗️ Tech Stack

### Frontend

* React / Next.js
* Tailwind CSS
* Axios
* Socket.IO Client

### Backend

* Node.js + Express
* MongoDB + Mongoose
* BullMQ (Queue System)
* Redis (Upstash)
* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render
* Redis: Upstash

---

## ⚙️ Architecture

Frontend (Vercel)
⬇
Backend API (Render)
⬇
Redis Queue (Upstash)
⬇
Worker (Render)
⬇
AI Processing + MongoDB

---

## 🚀 Live Demo

* 🌐 Frontend: *(Add your Vercel link here)*
* 🔗 Backend API: https://vedaai-8ita.onrender.com

---

## 📦 Installation (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/niru128/VedaAI.git
cd VedaAI
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
OPENAI_API_KEY=your_api_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🔁 Queue System (BullMQ)

* Jobs are added when an assignment is created
* Worker processes jobs asynchronously
* Redis manages the queue
* Status updates are sent via Socket.IO

---

## 📡 API Endpoints

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/assignment/create | Create assignment   |
| GET    | /api/assignment        | Get all assignments |
| GET    | /api/assignment/:id    | Get assignment      |
| DELETE | /api/assignment/:id    | Delete assignment   |

---

## 🧠 Key Learnings

* Implemented distributed job processing using Redis & BullMQ
* Built real-time systems with Socket.IO
* Managed environment-based configurations for production
* Designed scalable backend architecture

---

## 📌 Future Improvements

* User authentication (JWT)
* Role-based dashboards (Teacher/Student)
* Export assignments as PDF
* AI difficulty tuning
* Analytics dashboard

---

## 👨‍💻 Author

**Niranjan (Kael)**
Aspiring Software Developer | MERN | AI Enthusiast

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

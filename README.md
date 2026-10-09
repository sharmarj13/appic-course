# Appic Skill & Courses Platform

Full-Stack Course & Workshop Platform built with Next.js (Frontend), Express.js (Backend), Prisma ORM, and Supabase PostgreSQL.

---

## 📁 Repository Structure

```
├── backend/          # Express.js REST API, Prisma ORM, Supabase Database
└── frontend/         # Next.js App, Public Catalog, Admin Dashboard & CMS
```

---

## 🚀 Getting Started

### 1. Backend Setup (Express & PostgreSQL)
```bash
cd backend
npm install
npm run dev
```
- Server running at: **http://localhost:5005**
- Health Check: **http://localhost:5005/api/health**

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Web Application: **http://localhost:3005**
- Admin Panel: **http://localhost:3005/admin**

---

## 🗄️ Database Management
In the `backend` directory:
```bash
npm run db:push    # Push schema changes to Supabase
npm run db:seed    # Seed all courses and workshops
npm run db:studio  # Open Prisma Studio GUI
```

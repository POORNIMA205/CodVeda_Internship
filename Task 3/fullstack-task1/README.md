# Full-Stack Task 1 — MERN Role-Based Authentication App

Complete full-stack application:
- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose
- JWT authentication
- Role-based access control (user/admin)
- bcrypt password hashing
- Protected API routes
- Admin user management
- CORS, Helmet, compression
- Production build/deployment instructions

## Requirements
Node.js 18+, npm, and MongoDB local or MongoDB Atlas.

## Run Backend
```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fullstack_task1
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Backend: http://localhost:5000
Health: http://localhost:5000/api/health

## Run Frontend
Open another PowerShell:
```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```
Frontend: http://localhost:5173

## Create an Admin
Register normally, then use MongoDB Compass/Shell:
```javascript
use fullstack_task1
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```
Log out and log in again.

## API
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/users/profile
GET  /api/users             (admin)
PATCH /api/users/:id/role   (admin)

## Deployment
Backend can be deployed to Render/Railway/Fly.io/etc. Set PORT, MONGO_URI,
JWT_SECRET and CLIENT_URL. Start command: `npm start`.

Frontend can be deployed to Vercel/Netlify/etc. Set:
`VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api`
Build with `npm run build`; publish `dist`.

Never commit `.env`.

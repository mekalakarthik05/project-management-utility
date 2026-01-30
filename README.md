# 🚀 TaskTrail – SDLC Task Tracking System

TaskTrail is a full-stack project management utility designed to visualize and manage tasks across different phases of the Software Development Life Cycle (SDLC) such as Agile, Kanban, and Waterfall.

---

## 📌 Project Description

This application demonstrates various SDLC methodologies by tracking how tasks move across different development phases. Each task maintains a complete lifecycle history, allowing users to view previous states, transitions, and timestamps on demand.

The project is deployed as a one-go full-stack application on Vercel using React (Vite) and Vercel Serverless Functions, connected to MongoDB Atlas.

---

## ✨ Key Features

- User management (Create, Read, Update, Delete)
- Task management with SDLC phases
- Kanban-style task workflow
- Task lifecycle and history tracking
- API key–secured backend
- One-go deployment on Vercel
- Persistent storage using MongoDB

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- HTML, CSS, JavaScript

### Backend
- Node.js
- Vercel Serverless API Routes
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Vercel (Full-stack deployment)

---

## 📂 Project Structure

```
tasktrail-sdlc-tracker/
├── api/                # Serverless backend routes
├── client/             # React (Vite) frontend
│   ├── src/
│   └── dist/
├── lib/                # Database connection & middleware
├── models/             # Mongoose models
├── vercel.json
└── README.md
```

---

## 🌐 Live Demo

Live Application:  
https://tasktrail-sdlc-tracker.vercel.app

---

## ⚙️ Environment Variables (Vercel)

Set the following environment variables in the Vercel dashboard:

MONGO_URI=your_mongodb_atlas_connection_string  
API_KEY=dev-api-key  
VITE_API_KEY=dev-api-key  

---

## 🚀 Deployment Strategy

- Frontend built using Vite from the client directory
- Backend implemented using Vercel Serverless Functions
- MongoDB Atlas connected via environment variables
- Single deployment handles both frontend and backend

---

## 🧪 Run Locally (Optional)

git clone https://github.com/mekalakarthik05/tasktrail-sdlc-tracker.git  
cd client  
npm install  
npm run dev  

---

## 🎓 Academic Relevance

- Demonstrates SDLC concepts
- Full-stack application design
- Real-time task tracking
- Suitable for college projects and software engineering coursework

---

## 🔮 Future Enhancements

- Authentication and authorization
- Drag-and-drop Kanban board
- Analytics dashboard
- Notifications
- Multi-project support

---

## 👨‍💻 Author

Karthik Mekala  
GitHub: https://github.com/mekalakarthik05

---

## 📜 License

This project is developed for educational and academic purposes.

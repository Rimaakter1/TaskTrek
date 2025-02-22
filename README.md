# 🌿 Task Management Application

![Project Screenshot](https://i.ibb.co.com/N25Gt6bQ/Screenshot-2025-02-22-151004.png)

## 📖 Table of Contents  
1. [📜 Project Overview](#-project-overview)  
2. [🚀 Live Project Link](#-live-project-link)  
3. [🛠️ Technologies Used](#-technologies-used)  
4. [🔥 Core Features](#-core-features)  
5. [📦 Dependencies](#-dependencies)  
6. [🛠️ Installation Guide](#-installation-guide)

---

## 📜 Project Overview  
A task management application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. The app ensures **real-time synchronization** and **persistent data storage**.

---

## 🚀 Live Project Link  
🔗 **[Visit Live](https://tasktrek-55a4e.web.app/)**  

---

## 🛠️ Technologies Used  
- **Frontend**: Vite.js, React.js, @hello-pangea/dnd  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: Firebase Authentication  
- **Real-time Sync**: Socket.io, Firebase, Optimistic UI Updates  
- **UI & Styling**: Lucide-react, SweetAlert2, React-Toastify  

---

## 🔥 Core Features  
✅ **User Authentication** – Secure login via Firebase Google Auth  
✅ **Drag-and-Drop Task Management** – Move tasks between categories easily  
✅ **Persistent Storage** – MongoDB stores tasks with real-time updates  
✅ **Optimistic UI Updates** – Instant UI changes before backend sync  
✅ **Mobile Responsiveness** – Smooth UX on desktop & mobile  
✅ **REST API** – CRUD operations for task management  
✅ **Dark Mode Toggle** *(Bonus)*  
✅ **Activity Log** *(Bonus: Track task updates in real-time)*  

---

## 📦 Dependencies  
```
{
  "dependencies": {
    "@hello-pangea/dnd": "^18.0.1",
    "axios": "^1.7.9",
    "firebase": "^11.3.1",
    "localforage": "^1.10.0",
    "lucide-react": "^0.475.0",
    "match-sorter": "^8.0.0",
    "react": "^19.0.0",
    "react-calendar": "^5.1.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.2.0",
    "react-toastify": "^11.0.3",
    "socket.io-client": "^4.8.1",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.17.2"
  }
}
```
## 🛠️ Installation Guide

To set up and run this project locally, follow these steps:

### **1️⃣ Clone the Repository
```
git clone <repository-url>
cd tasktrek
```
### **2️⃣ Install Dependencies
```
npm install
```
### **3️⃣ Run the Development Server
```
npm run dev
```

## 🔧 Development

To build the project for production:

```
npm run build
```

# 🧠 SakshamGPT – AI Chat Platform

SakshamGPT is an intelligent full-stack chat application powered by AI. It enables users to interact with a GPT-like model through a clean interface, manage chat history, and experience features like image uploads and secure authentication.

&#x20;  &#x20;

---

## ✨ Features

- 🔐 Secure Auth with **Clerk**
- 💬 Realtime **chat** with AI
- 📦 Upload images via **ImageKit**
- 🧠 Store and view chat history
- 🌐 Full **MERN stack** integration
- ⚡ Smooth routing with React Router
- 🎨 Tailwind CSS UI components

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/ce43b551-60d3-45ce-8c8d-b08e1643f552)

---

## 🛠️ Tech Stack

| Frontend     | Backend    | Auth & Media    | Hosting & DB     |
| ------------ | ---------- | --------------- | ---------------- |
| React + Vite | Express.js | Clerk, ImageKit | Vercel + MongoDB |

---

## 📂 Project Structure

```
SakshamGpt/
│
├── client/          # React frontend
│   ├── src/
│   └── public/
│
├── server/          # Express backend
│   ├── models/
│   └── index.js
│
├── .env             # Environment variables
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Saksham1143me/SakshamGpt.git
cd SakshamGpt
```

### 2. Setup the backend

```bash
cd server
npm install
# Set up your .env file with MongoDB, Clerk, ImageKit keys
node index.js
```

### 3. Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📜 Environment Variables

### Server `.env`

```env
PORT=3000
MONGODB_URL=your_mongodb_uri
CLIENT_URL=http://localhost:5173
VITE_IMAGE_KIT_ENDPOINT=your_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_public_key
VITE_IMAGE_KIT_PRIVATE_KEY=your_private_key
```

### Client `.env`

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_CLERK_SECRET_KEY=your_clerk_key
```

---

## 📈 Status

✅ Deployed: [https://saksham-gpt.vercel.app](https://saksham-gpt.vercel.app/)
🔧 Serverless backend: [https://saksham-gpt-api.vercel.app/api/upload](https://saksham-gpt-server.vercel.app/)

---

## 🙇‍♂️ Author

**Saksham Goyal**\
[LinkedIn](https://linkedin.com/in/saksham-g-0b644a2a9) | [GitHub](https://github.com/Saksham1143me)

---

## 📌 License

This project is for educational/demo purposes. Feel free to fork and build on top of it 🚀


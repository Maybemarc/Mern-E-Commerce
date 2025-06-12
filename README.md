# 🛒 MERN E-Commerce Web Application

A full-featured, responsive E-Commerce website built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), featuring **secure authentication**, **dynamic product listing**, **shopping cart**, **order system**, and **admin-only product management**. Designed for smooth user experience with seamless integration between frontend and backend.

---

## ✨ Features

- 🔐 **JWT Authentication** with secure HTTP-only cookies.
- 🛍️ Users can **browse, filter, and search** products by category.
- 🧺 **Cart system** with real-time quantity updates and discounted pricing.
- 📦 **Order placement** flow with automatic cart reset and order tracking.
- 👨‍💼 **Admin Routes** for product **CRUD operations**, accessible only to authorized admin.
- 📱 Fully **responsive design** with a modern UI for all devices.
- 🌐 **Frontend and backend deployed on Vercel** with proper CORS setup.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Context API
- CSS Modules / Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- cookie-parser
- CORS
- dotenv

**Deployment:**
- Vercel (Frontend + Backend)

📦 root
├── client/ # React Frontend
│ ├── components/
│ ├── pages/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Express Backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── .env
└── README.md


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce

2. Install Dependencies
Backend

cd Backend
npm install

Frontend

cd e-commerce
npm install

3. Create Environment Variables
In server/.env:

PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

4. Run the App
Backend:

npm run dev
Frontend:


npm run dev
Make sure both servers are running and CORS settings allow the frontend to communicate with the backend.

🔐 Admin Access
Only the admin has permission to create, update, and delete products.

Admin credentials can be manually set in MongoDB by setting isAdmin: true for a user document.



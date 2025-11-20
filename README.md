# MERN Stack Integration Project

## 🚀 Project Overview

This project is a **full-stack MERN blog application** demonstrating integration between React frontend, Express backend, and MongoDB. The application allows users to **view posts, create new posts, edit and delete posts, and manage categories**. Advanced features such as **user authentication and comments** are partially implemented.

---

## 🛠️ What I’ve Implemented

### Backend

* **Express server** with middleware for JSON parsing and error handling
* **MongoDB connection** using Mongoose
* **Post and Category models** with proper relationships
* **API routes for posts and categories**:

  * `GET /api/posts` – Get all posts
  * `GET /api/posts/:id` – Get a specific post
  * `POST /api/posts` – Create a post
  * `PUT /api/posts/:id` – Update a post
  * `DELETE /api/posts/:id` – Delete a post
  * `GET /api/categories` – Get all categories
  * `POST /api/categories` – Create a category
* **Input validation** using `express-validator`
* **Basic error handling middleware`

### Frontend

* **React app** created with Vite
* **Components built**:

  * Post list view
  * Single post view
  * Create/edit post form
  * Navigation bar
* **React Router** implemented for navigation
* **Custom API hook** to fetch posts and categories
* **State management** using `useState` and `useEffect`
* **Form handling** with validation for creating/editing posts
* **Loading and error states** displayed during API calls

### Integration

* Connected frontend with backend using fetch API
* Displayed posts dynamically on the frontend
* Implemented basic **create, read, update, delete (CRUD) functionality** for posts

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd client
npm install
```

4. Configure `.env` files based on `.env.example` for MongoDB connection and frontend API URL.
5. Run the development servers:

```bash
# Server
cd server
npm run dev

# Client
cd client/src
npm run dev

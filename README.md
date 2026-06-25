# 📚 The Athenaeum – Personal Book Library

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![TanStack Query v5](https://img.shields.io/badge/React_Query-v5-FF4154?logo=reactquery&logoColor=white&style=for-the-badge)](https://tanstack.com/query/latest)
[![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-34D399?style=for-the-badge)](LICENSE)

**A modern, elegant, and secure full-stack personal library management application.**

*Manage your book collection effortlessly with a premium dark-themed interface designed for readers who love keeping track of their favorite books.*

[Key Features](#-key-features) • [Preview](#-preview) • [Architecture](#-architecture--directory-structure) • [Setup & Installation](#-getting-started) • [API Documentation](#-api-documentation) • [Security & Validations](#-security--data-validation)

</div>

---

## ✨ Key Features

### 💻 Frontend (The Client)
*   **📚 Collection Management:** Add books, modify details inline, or delete entries seamlessly through a modular drawer form.
*   **⭐ Interactive Ratings:** Visual 5-star rating system with instant feedback.
*   **🔖 Reading Status Trackers:** Color-coded badges for quick status distinction (`Read` and `Unread`).
*   **💖 Favorite Toggle:** Add books to your favorites collection directly from their cards.
*   **🔍 Live Search:** Real-time, debounced search querying titles and authors.
*   **🎨 Premium Dark Aesthetics:** Deep slate background with gold accent colors, smooth scales, hover transitions, and responsive grid layouts.
*   **⚡ State Syncing:** Powered by TanStack React Query for auto-caching, prefetching, and smooth updates without reloading.

### ⚙️ Backend (The Server)
*   **🚪 REST API Architecture:** Clean, modular router structures built with Node.js and Express.
*   **📦 Database Integration:** Persistent document-based data management using MongoDB and Mongoose.
*   **🛡️ Robust Data Validation:** Strict input validation and sanitization via `express-validator`.
*   **🔒 Security Best Practices:**
    *   **Helmet:** Secures response headers.
    *   **CORS Configuration:** Origin whitelist validation matching specific port patterns.
    *   **Rate Limiting:** Protects endpoints from DDoS and brute-force requests.
    *   **Compression:** Gzip compression middleware to reduce payload transfer latency.
*   **🎯 Global Error Handling:** Custom middleware ensuring clean, structured JSON error responses rather than server tracebacks.

---

## 🖼️ Preview

### Dashboard

![The Athenaeum Dashboard](/frontend/assets/image.png)

*A preview of the collection page displaying book cards, ratings, search, and the responsive book layout.*

---

## 📂 Architecture & Directory Structure

The project is structured as a decoupled monorepo containing a frontend React app and a backend Express app:

```bash
personal-book-library/
│
├── backend/                  # Node.js/Express Backend App
│   ├── config/               # Database connectivity configurations
│   ├── controllers/          # Business logic handlers for Express routes
│   ├── middleware/           # Rate limiting, validation, error handler logic
│   ├── models/               # Mongoose schema definitions (Book model)
│   ├── routes/               # API endpoint router mappings
│   ├── utils/                # Standardized response helper utilities
│   ├── .env                  # Server-side environment variables
│   ├── server.js             # Main server execution point
│   └── package.json
│
└── frontend/                 # React Frontend App (Vite/Tailwind)
    ├── public/               # Static browser assets
    ├── src/
    │   ├── components/       # Visual UI blocks (NavBar, BookCard, BookForm)
    │   ├── hooks/            # TanStack Query custom hook abstractions
    │   ├── pages/            # View pages (Home component dashboard)
    │   ├── providers/        # React Context / QueryClient providers
    │   ├── services/         # Fetch API server client wrappers
    │   ├── index.css         # Custom styles, transitions, and keyframes
    │   └── main.jsx          # React app mount bootstrap
    ├── .env                  # Frontend build-time environment variables
    ├── vite.config.js        # Vite bundling and plugins configurations
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:
*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [MongoDB](https://www.mongodb.com/) (Local instance running on `localhost:27017` or a remote MongoDB Atlas URI)
*   `npm` or `yarn` package manager

---

### Installation & Configuration

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhik-kundu09/personal-book-library.git
   cd personal-book-library
   ```

2. **Configure Backend Settings**
   Navigate to the backend directory, install packages, and set up your `.env` file:
   ```bash
   cd backend
   npm install
   ```


3. **Configure Frontend Settings**
   Navigate to the frontend directory, install packages, and set up your `.env` file:
   ```bash
   cd ../frontend
   npm install
   ```


---

### Running the Project

You can run the frontend and backend in separate terminal windows.

#### 1. Start the Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```
*The server will start on port `5000`. You should see `Server running in development mode on port 5000`.*

#### 2. Start the Frontend Server (Terminal 2)
```bash
cd frontend
npm run dev
```
*The React app will boot up on port `5173`. Open [http://localhost:5173](http://localhost:5173) in your browser.*

---

## 🔌 API Documentation

All routes are prefixed with `/api`.

### Endpoints Reference

| Method | Endpoint | Query / Body Params | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | *None* | Checks server health and availability. |
| **GET** | `/books` | `page`, `limit`, `sort` (optional) | Retrieves list of all books, paginated. |
| **GET** | `/books/search`| `q` (required), `page`, `limit` | Searches books by title or author. |
| **GET** | `/books/:id` | `id` (Param) | Retrieves a specific book by MongoDB ID. |
| **POST**| `/books` | Request Body (JSON) | Adds a new book to the library. |
| **PUT** | `/books/:id` | `id` (Param) + Request Body | Modifies details of an existing book. |
| **PATCH**| `/books/:id/favorite`| `id` (Param) | Toggles the favorite flag (`isFavorite`). |
| **DELETE**| `/books/:id`| `id` (Param) | Deletes a book record from the collection. |

### Expected Schema Payload for `POST` / `PUT`
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "rating": 5,
  "status": "Read",
  "description": "A novel about the roaring twenties...",
  "isFavorite": true
}
```

---

## 🛡️ Security & Data Validation

### 1. Robust Input Validation (`express-validator`)
The backend validates request payloads before modifying the database. If validation fails, the server responds with a clear `400 Bad Request` payload detailing exactly which fields failed validation.
*   `title`: Trimmed, required, must be `2 - 100` characters.
*   `author`: Trimmed, required, must be `2 - 100` characters.
*   `genre`: Trimmed, required, minimum `2` characters.
*   `rating`: Required, numeric, must be between `1` and `5`.
*   `status`: Required, enum restricted to exactly `Read` or `Unread`.
*   `description`: Optional, trimmed, maximum length of `1000` characters.
*   `id`: Parameters are verified to be valid MongoDB ObjectIDs.
*   `pagination`: `page` and `limit` queries are validated to be positive integers.

### 2. Built-in Security Features
*   **Helmet.js Integration:** Automatically sets secure HTTP headers to mitigate cross-site scripting (XSS), clickjacking, and info leaks.
*   **API Rate Limiting:** Restricted to `100` requests every `15 minutes` per IP address on the API endpoints to block scrapers and bruteforcing attempts.
*   **Strict CORS Policy:** Credentials are authenticated, and origins are limited to verified domains configuration-driven from environment variables.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📝 License

This project is licensed under the **MIT License**. Check the [LICENSE](LICENSE) file for more information.

---

## 👨‍💻 Author

**Abhik Kundu**
*Computer Science & Engineering Student passionate about building elegant, clean, and user-friendly full-stack web applications.*

*   **GitHub:** [@abhik-kundu09](https://github.com/abhik-kundu09)

<div align="center">

*Curated with care.*

**📚 The Athenaeum**

</div>
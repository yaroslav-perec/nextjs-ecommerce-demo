# Next.js E-commerce Demo

A modern, responsive e-commerce web app built with **Next.js 15**, **Tailwind CSS 4**, and **Zustand** — using the [DummyJSON API](https://dummyjson.com) as a mock data source.

This project demonstrates clean frontend architecture, state management, and persistent cart logic suitable for modern React applications.

---

## 🚀 Live Demo
👉 [nextjs-ecommerce-demo.vercel.app](https://nextjs-ecommerce-demo.vercel.app)

---

## 🧩 Features

- 🏠 **Home Page** — Product list with images, prices, and ratings
- 📄 **Product Details Page** — Dynamic route `/products/[id]` with product info and add-to-cart
- 🛒 **Cart Page** — Add / remove items, quantity controls, total price and item count
- 💾 **Persistent Cart** — Uses Zustand with `sessionStorage` for per-session persistence
- 🧭 **Header Navigation** — Includes site name and live cart item count
- 🌙 **Dark Mode Ready** — Tailwind dark mode support
- ⚡ **Next.js App Router** — Server Components + modern data fetching

---

## 🛠️ Tech Stack

- **Next.js 15 (App Router)**
- **React 18**
- **Tailwind CSS 4**
- **Zustand** (state management)
- **TypeScript**
- **DummyJSON API**

---

## 🧰 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Run the development server
bash
Copy code
npm run dev
Then open http://localhost:3000 in your browser.

💡 Design Decisions
State Management: Used Zustand instead of Redux for minimal boilerplate and simple persistence.

Persistence: Cart data is stored in sessionStorage, surviving page reloads but resetting on browser close (mimicking a guest session).

API Fetching: Used native fetch() inside server components with { cache: 'no-store' } for always-fresh data.

Styling: Tailwind CSS v4 for fast iteration and dark-mode support.

Routing: Next.js App Router handles dynamic product routes seamlessly.

⚙️ Scripts
Command	Description
npm run dev	Run development server
npm run build	Build production bundle
npm run start	Start production server
npm run lint	Run ESLint

📦 Deployment
Push to GitHub, then deploy on Vercel.
Vercel will detect the Next.js app automatically — no additional configuration required.

🧠 Possible Extensions
🔍 Product search or category filters

⭐ Star rating component

💬 Product reviews

🧾 Checkout flow mockup

🧪 Unit tests for Zustand store or Playwright e2e

👤 Author
Built by Yaroslav Perets — Frontend Developer
📧 perets.yaroslav@gmail.com
💼 https://www.linkedin.com/in/yaroslav-perets/

📝 License
This project is open-source and available under the MIT License.
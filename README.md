# 🛍️ Next.js E-commerce Demo

A modern, responsive e-commerce web app built with **Next.js 15**, **Tailwind CSS 4**, and **Zustand**, using the [DummyJSON API](https://dummyjson.com) as a mock backend.

This project demonstrates clean architecture, modular structure, and persistent cart logic suitable for modern React applications.

---

## 🚀 Live Demo

👉 [nextjs-ecommerce-demo-azure.vercel.app](https://nextjs-ecommerce-demo-azure.vercel.app)

---

## 🧩 Features

* 🏠 **Home Page** — Product list with infinite scroll
* 📄 **Product Details Page** — Dynamic route `/products/[id]` with server data fetching
* 🛒 **Cart Page** — Add / remove items, quantity controls, totals and discounts
* 💾 **Persistent Cart** — Using Zustand + `sessionStorage`
* 🧭 **Header Navigation** — Dynamic cart badge with animation
* 🌙 **Dark Mode Ready** — Light and dark themes via `next-themes`
* ⚡ **Next.js App Router** — Fully server-component–based architecture
* 🧪 **Unit Tests** — Vitest + React Testing Library for store and UI components

---

## 🛠️ Tech Stack

* **Next.js 15 (App Router)**
* **React 19**
* **Tailwind CSS 4**
* **Zustand** (state management)
* **TypeScript**
* **Vitest + RTL** (testing)
* **DummyJSON API**

---

## ⚙️ Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run development server  |
| `npm run build` | Build for production    |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |
| `npm run test`  | Run unit tests (Vitest) |

---

## 🧰 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3️⃣ Run tests

```bash
npm run test
```

---

## 💡 Thought Process & Trade-offs

* **🧠 State management:**
  Used **Zustand** instead of Redux for a simpler and more lightweight solution that fits perfectly for a small-scale e-commerce demo.

* **💾 Persistence:**
  Used `sessionStorage` instead of `localStorage` to mimic a guest session that resets when the browser closes.

* **📡 Data fetching:**
  API requests are made via server components using native `fetch` with `{ cache: 'no-store' }` to ensure fresh data on every request.

* **🎨 Styling:**
  Tailwind CSS v4 was used for rapid iteration and built-in dark mode support.

* **🧱 Architecture:**
  Each feature (home, cart, products, shared) is isolated in its own `/modules` folder for scalability.

* **🧪 Testing:**
  Added **Vitest** and **React Testing Library** for critical components and store logic:

    * ✅ `useCart` store — state persistence & quantity logic
    * ✅ `AddToCartButton` — interaction and UI behavior
    * ✅ `HomePage` — render sanity test

---

## ⚠️ Known Limitations

* No backend checkout or authentication — this is a **frontend-only demo**.
* Product API (DummyJSON) has static mock data.
* SEO and Open Graph metadata are simplified for the demo.
* Limited test coverage — only core logic and render tests implemented.

---

## 🧠 Possible Extensions

* 🔍 Product search and filtering
* 💳 Checkout mockup
* ⭐ Product rating and reviews
* 🌐 i18n / multi-language support
* 🧾 E2E testing with Playwright

---

## 👤 Author

**Yaroslav Perets** — Frontend Developer
📧 [perets.yaroslav@gmail.com](mailto:perets.yaroslav@gmail.com)
💼 [linkedin.com/in/yaroslav-perets](https://www.linkedin.com/in/yaroslav-perets/)

---

## 📝 License

This project is open-source and available under the **MIT License**.

# JobNest — Frontend

JobNest is a full-featured job portal platform connecting candidates with employers across Bangladesh. This repository contains the **frontend web application**, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui.

🔗 **Live Website:** https://jobnest-frontend-three.vercel.app

🔗 **Backend Repository:** [jobnest-backend](https://github.com/kibriarobin/jobnest-backend)

🔗 **Backend API:** https://jobnest-backend-kappa.vercel.app

---

## ✨ Features

- **Public Job Board** — browse, search, filter (category, location, type), sort, and paginate job listings
- **Job Details** — full job description, requirements, company info, and related jobs
- **Company Directory** — browse verified companies, view their open positions and reviews
- **Role-based Dashboards** — separate dashboards for Candidate, Employer, and Admin with sidebar navigation and role-aware routing
  - **Candidate:** overview stats, applications tracker, saved jobs, editable profile, post-interview company reviews
  - **Employer:** overview analytics, job posting/editing, applicant pipeline management, company settings
  - **Admin:** platform-wide analytics, user/job/company/category moderation
- **Authentication** — email/password auth with JWT (httpOnly cookies), silent token refresh, and Google OAuth (candidate-only)
- **Dark / Light Mode** — full theme support via `next-themes`
- **Dashboard Analytics** — real-time charts (bar, line, pie) built with Recharts, powered by backend aggregation
- **Contact Form** — client-side email delivery via EmailJS
- **Responsive Design** — fully responsive across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Forms | React Server Actions + `useActionState` |
| Validation | Zod |
| Charts | Recharts |
| Auth Middleware | Custom `proxy.ts` (JWT verification via `jose`) |
| Email | EmailJS |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```
app/
├── (authGroup)/              # Login, Register
│   ├── login/
│   └── register/
├── (dashboardGroup)/         # Role-based dashboards
│   ├── candidate-dashboard/
│   ├── employer-dashboard/
│   └── admin-dashboard/
├── (publicGroup)/            # Public-facing pages
│   ├── page.tsx                # Home
│   ├── jobs/                    # Listing + details
│   ├── companies/               # Directory + details
│   ├── about/, contact/
├── api/
│   └── googleAuth/            # Google OAuth callback handler
├── layout.tsx
└── globals.css

components/
├── layout/                    # Navbar, Footer, Dashboard Sidebar/Header
├── providers/                 # Theme, React Query providers
├── shared/                    # Reusable cards, charts, badges
└── ui/                        # shadcn/ui primitives

lib/
├── type.ts                    # Centralized TypeScript types
├── dashboard-nav.ts             # Role-based sidebar navigation config
└── server-fetch.ts              # Authenticated fetch helper

service/                       # Server-side data fetching functions
utils/                         # JWT verification helper
proxy.ts                       # Root middleware (auth + role-based routing)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- A running instance of the [JobNest backend](https://github.com/kibriarobin/jobnest-backend)

### Installation

```bash
git clone https://github.com/kibriarobin/jobnest-frontend.git
cd jobnest-frontend
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000

JWT_ACCESS_SECRET="same as backend"
JWT_REFRESH_SECRET="same as backend"

NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-emailjs-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
```

⚠️ `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` must exactly match the backend's values, since the middleware (`proxy.ts`) verifies tokens locally without calling the backend.

### Run the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## 🏗️ Architecture Notes

- **Route Groups** — `(authGroup)`, `(dashboardGroup)`, and `(publicGroup)` separate layouts without affecting URL structure
- **Server Actions over API routes** — most mutations (job creation, profile updates, applications) use Next.js Server Actions calling the backend directly, keeping secrets server-side
- **Role-aware Middleware** — `proxy.ts` verifies JWTs at the edge, silently refreshes expired access tokens, and redirects users based on role and route
- **Centralized Types** — all shared TypeScript types live in `lib/type.ts` as the single source of truth across the app
- **Cross-domain Auth** — since the frontend and backend are deployed on separate Vercel domains, Google OAuth tokens are passed via a signed redirect and set as cookies from within the frontend's own domain (`app/api/googleAuth/route.ts`)

---

## 👤 Author

**Golam Kibria Robin**
[GitHub](https://github.com/kibriarobin) · [LinkedIn](https://linkedin.com/in/golam-kibria97)

Built as part of the Programming Hero "Next Level Web Development" — AI-Driven Software Engineering Bootcamp.

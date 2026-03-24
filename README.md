# 🏥 Healthcare SaaS — B2B Frontend Application

A B2B Healthcare SaaS UI built with React, TypeScript, and Tailwind CSS. Features authentication, analytics, patient management, and push notifications via a Service Worker.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State Management | Zustand (with persistence) |
| Authentication | Firebase Auth |
| Charts | Recharts |
| Icons | Lucide React |
| Notifications | Service Worker + Notifications API |

---

## ✨ Features

### 🔐 Authentication
- Sign Up with full name, email, and password
- Login with Firebase Email/Password authentication
- Session persistence across page refreshes
- Protected routes — unauthenticated users redirected to `/login`
- Proper Firebase error handling (`invalid-credential`, `email-already-in-use`, `weak-password`, etc.)
- Password strength indicator on signup
- Real-time confirm password match feedback

### 📊 Dashboard
- Summary stat cards — Total Patients, Active, Critical, Appointments
- Critical patients quick-view panel
- Recent patients table with clickable rows
- Auto-triggers a push notification on load

### 📈 Analytics
- Patient growth line chart (monthly)
- Monthly appointments bar chart
- Revenue trend line chart
- Patient status donut/pie chart
- Gender distribution bar
- Summary KPI cards with month-over-month change

### 👥 Patient Management
- Grid view and List view with toggle switch
- Live search — filter by name, condition, or doctor
- Patient detail page with full info card
- "Send Alert" button triggers a push notification for that patient
- Critical status banner on detail page

### 🔔 Notifications (Service Worker)
- Service Worker registered at `/sw.js`
- Push/local notifications via Notifications API
- Auto notification on dashboard load (critical patient count)
- Manual notification trigger on dashboard and patient detail page
- Notification click opens the app

### 🧭 Navigation
- Collapsible sidebar with active route highlighting
- Links: Dashboard, Analytics, Patients
- Logout button clears session and redirects to login

---

## 📁 Project Structure

```
healthcare-saas/
├── public/
│   └── sw.js                  # Service Worker
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx     # App shell with sidebar + outlet
│   │   │   └── Sidebar.tsx    # Collapsible navigation sidebar
│   │   ├── ui/
│   │   │   ├── StatusBadge.tsx  # Active / Inactive / Critical badge
│   │   │   └── ViewToggle.tsx   # Grid / List toggle switch
│   │   └── ProtectedRoute.tsx   # Auth guard wrapper
│   ├── hooks/
│   │   └── useNotifications.ts  # Service worker + notification hook
│   ├── lib/
│   │   ├── firebase.ts          # Firebase app initialization
│   │   └── mockData.ts          # Mock patients + analytics data
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── PatientsPage.tsx
│   │   └── PatientDetailPage.tsx
│   ├── store/
│   │   └── index.ts             # Zustand store (auth + patient state)
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   ├── App.tsx                  # Root component + route definitions
│   └── index.tsx                # React DOM entry point
├── .env                         # Firebase environment variables (not committed)
├── .env.example                 # Environment variable template
├── tailwind.config.js
└── postcss.config.js
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd healthcare-saas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Copy the example env file and fill in your Firebase Web App credentials:

```bash
cp .env.example .env
```

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

> **How to get Firebase Web Config:**
> Firebase Console → Project Settings → Your Apps → Add Web App → copy the `firebaseConfig` object.

> **Enable Email/Password Auth:**
> Firebase Console → Authentication → Sign-in method → Email/Password → Enable.

### 4. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Available Scripts

| Script | Description |
|---|---|
| `npm start` | Run app in development mode |
| `npm run build` | Build optimized production bundle |
| `npm test` | Run test suite in watch mode |

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_FIREBASE_API_KEY` | Firebase Web API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Firebase app ID |

> Never commit your `.env` file. It is listed in `.gitignore` by default with CRA.

---

## 🗺️ App Routes

| Route | Page | Auth Required |
|---|---|---|
| `/login` | Login Page | No |
| `/signup` | Sign Up Page | No |
| `/dashboard` | Dashboard / Home | Yes |
| `/analytics` | Analytics Page | Yes |
| `/patients` | Patient List | Yes |
| `/patients/:id` | Patient Detail | Yes |

---

## 🧠 State Management

Zustand is used with two stores:

- `useAuthStore` — holds `user`, `loading`, persisted to `localStorage`
- `usePatientStore` — holds `patients`, `viewMode`, `searchQuery`, `selectedPatient`

---

## 📬 Notifications

The app registers a Service Worker (`/public/sw.js`) on load. Notifications are triggered:

1. Automatically on Dashboard load (critical patient count alert)
2. Manually via the "Test Notification" button on the Dashboard
3. Via the "Send Alert" button on any Patient Detail page

Browser notification permission is requested on first trigger.

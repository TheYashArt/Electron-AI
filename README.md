# Electron AI

Frontend UI for an electronics-focused knowledge assistant. It ships a landing page, auth screens, a projects dashboard, a drag-and-drop knowledge uploader, and a chat workspace that feels like a polished product ready to hook into your backend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Key UX Flows](#key-ux-flows)
- [Extending the App](#extending-the-app)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features
- **Landing experience**: Animated hero with typewriter headline, floating electronics icons, sparkles, and scroll-triggered sections for demo and “How it works”.
- **Auth UI**: Login/Sign-up toggle, email/password fields with show/hide, quick navigation back to home.
- **Dashboard**: Project grid with create/delete modals, shared vs personal sections, and profile/model settings drawer.
- **Knowledge upload**: Drag-and-drop or file picker for multiple files (PDF by default), metadata chips, inline preview in a modal, and “clear all” control.
- **Chat workspace**:
  - Collapsible sidebar with chat history, rename/delete via contextual modal.
  - Inline model/profile sheet from the footer avatar.
  - Typewriter prompt suggestions when empty, message copy affordance, smooth scrolling.
  - Frontend-only message handling ready to be swapped for an API call.
- **Motion & polish**: Framer Motion microinteractions, Lenis smooth scrolling, Tailwind-driven responsive layout, iconography via Lucide.

## Tech Stack
- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4 (new `@import "tailwindcss"` workflow)
- Framer Motion for animations
- Lucide React icons
- Lenis for smooth scroll

## Project Structure
```
electron-ai/
├─ src/
│  ├─ main.jsx               # App entry
│  ├─ App.jsx                # Route map
│  ├─ SmoothScroll.jsx       # Lenis hook wrapper
│  ├─ index.css              # Tailwind 4 entry + utilities
│  ├─ assets/                # Logos and icon set
│  └─ Components/
│     ├─ Auth/               # Login / signup toggle UI
│     ├─ Chat/               # Chat shell, sidebar, messages
│     ├─ Dashboard/          # Projects grid + modals
│     ├─ Landing Page/       # Hero, demo, how-it-works
│     ├─ Models/             # Reusable modals (profile, project, delete)
│     └─ Upload/             # Drag-and-drop uploader + cards
├─ public/                   # Static assets served by Vite
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

## Getting Started
Prerequisites: Node.js 18+ (20 LTS recommended) and npm.

1) Install deps  
   `npm install`
2) Start dev server (Vite defaults to http://localhost:5173)  
   `npm run dev`
3) Build for production  
   `npm run build`
4) Preview the production bundle locally  
   `npm run preview`

## Available Scripts
- `npm run dev` — start Vite in development mode.
- `npm run build` — produce static assets in `dist/`.
- `npm run preview` — serve the built bundle for smoke tests.
- `npm run lint` — run ESLint with the configured React/Tailwind setup.

## Key UX Flows
- **Landing → Auth**: `LandingPage.jsx` drives the scroll story; “Get Started” navigates to `/login`.
- **Auth**: `Login.jsx` handles login/sign-up toggle UI only; submission currently just routes to the dashboard (`/dashboard`).
- **Dashboard**: `Dashboard.jsx` lists projects, opens `NewProjectModel.jsx` for creation, and `PendingDeleteModel.jsx` for confirmation. Cards navigate to the uploader.
- **Uploader**: `Upload.jsx` supports drag/drop or picker, shows file meta via `DataCard.jsx`, previews in an iframe modal, and can clear or remove items individually.
- **Chat**: `Chat.jsx` manages chat state; `ChatSideBar.jsx` handles history, profile/model sheet, and navigation; `ChatSection.jsx` renders messages with copy + typewriter empty state.

## Extending the App
- **Wire the chat to your backend**: In `src/Components/Chat/Chat.jsx`, replace `handleSendMessage` with an async call to your API and append both user and assistant messages to `messages`.
- **Persist projects/files**: Swap the in-memory arrays in `Dashboard.jsx` and `Upload.jsx` with API calls; replace object URLs with server URLs and clean up revocation as needed.
- **Auth**: Hook `Login.jsx` to real auth endpoints and store tokens; gate routes with protected-route logic in `App.jsx`.
- **Model settings**: The profile sheet lists preset models; connect selections to your inference backend or settings store.
- **Styling**: Global utilities live in `src/index.css`. Tailwind 4 is already wired; add design tokens there or via `tailwind.config.js`.

## Deployment
`npm run build` outputs static assets to `dist/`. Serve that folder from any static host or behind your Electron shell. For static hosting, ensure fallback routing to `index.html` so React Router works (e.g., configure rewrites on Netlify/Vercel or your CDN).

## Troubleshooting
- Seeing blank styles? Make sure Tailwind 4 `@import "tailwindcss";` remains at the top of `src/index.css`.
- Animations stutter? Lenis uses `requestAnimationFrame`; confirm the wrapper `<SmoothScroll>` stays mounted in `main.jsx`.
- Icons missing? Lucide React is included; verify imports from `lucide-react` and case-sensitive paths.

## License
License not specified. Add one (e.g., MIT) if you plan to distribute.

# Noor Motion Studio

A cinematic 3D motion-design portfolio built with React, Vite, Three.js, React Three Fiber, GSAP, and Lenis. The frontend and Express enquiry API are maintained as separate applications.

## Requirements

- Node.js 20+
- npm
- Optional: MongoDB, Cloudinary, and SMTP credentials for live enquiry storage, uploads, and email

## Run locally

Install dependencies once in each application:

```powershell
npm install --prefix frontend
npm install --prefix backend
```

Copy `frontend/.env.example` to `frontend/.env` and `backend/.env.example` to `backend/.env`, then configure integrations as needed. Start each application in a separate terminal:

```powershell
npm run dev --prefix frontend
npm run dev --prefix backend
```

The Vite development server proxies `/api` requests to `http://localhost:3001`. To create the frontend production build, run `npm run build --prefix frontend`.

## Project layout

- `frontend/src/components/` — shared navigation, cursor, preloader, and UI
- `frontend/src/components3D/` — Three.js scene, lighting, camera, environment, and objects
- `frontend/src/sections/` — portfolio page sections
- `frontend/src/pages/` — home, project detail, and not-found pages
- `frontend/src/data/` — editable sample project and service content
- `backend/src/` — enquiry API configuration, model, route, controller, and email service

Sample portfolio artwork is CSS-based until project media is supplied. Place media under `frontend/public/images/`, `frontend/public/videos/`, and models under `frontend/public/models/`. The recording and sample assets listed in the reference tree were not present in the workspace.

The enquiry API accepts up to five reference files (10 MB each); configure Cloudinary to enable uploads. Configure MongoDB and/or SMTP to enable enquiry delivery.

# Movies App - Full Stack App (Node/Express + MongoDB + React/TypeScript)
Small full-stack app that fetches OMDb search results on the **backend**, stores unique movies in **MongoDB**, keeps **posters** in a separate collection with a relation, and renders them in a React (TS + Vite + Tailwind) responsive UI with **3 preset buttons** + a **search input**. Includes **backend (Jest)** and **frontend (Vitest + RTL + MSW)** tests.

## Tech Stack

- **Backend:** Node, Express, TypeScript, Mongoose
- **DB:** MongoDB (local, or in-memory for dev/tests)
- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS
- **Testing:**  
  - Backend: Jest, ts-jest, Supertest, mongodb-memory-server  
  - Frontend: Vitest, React Testing Library, MSW
# Movies App - Full Stack App (Node/Express + MongoDB + React/TypeScript)
Small full-stack app that fetches OMDb search results on the **backend**, stores unique movies in **MongoDB**, keeps **posters** in a separate collection with a relation, and renders them in a React (TS + Vite + Tailwind) responsive UI with **3 preset buttons** + a **search input**. Includes **backend (Jest)** and **frontend (Vitest + RTL + MSW)** tests.

## Tech Stack
- **Backend:** Node, Express, TypeScript, Mongoose
- **DB:** MongoDB (local, or in-memory for dev/tests)
- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS
- **Testing:**  
  - Backend: Jest, ts-jest, Supertest, mongodb-memory-server  
  - Frontend: Vitest, React Testing Library, MSW

## Demo
https://github.com/user-attachments/assets/7a0e0e63-c7b7-4467-9180-365b9cb812fa

## Setup local
To run locally just download the code, add in api folder a file named .env with 
```sh
MONGO_URI=memory
```
so the database will be kept in memory for testing purposes.
Make sure you have Node.js installed and run the following command in both api and web folders.
```sh
npm run dev
```
After that, open browser at http://localhost:5173/.

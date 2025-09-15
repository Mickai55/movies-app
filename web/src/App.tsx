import MoviesGrid from "./components/list/MoviesGrid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/home/NavBar";
import Home from "./components/home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<MoviesGrid />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

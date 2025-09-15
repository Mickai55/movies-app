import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-black text-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MoviesApp
        </Link>
        <div className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

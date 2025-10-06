import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  console.log(user);

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
        {user ? (
          <Link to="/profile">
            <div className="flex gap-3 items-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full ">
                  <span className="flex items-center justify-center w-full h-full text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                </div>
              )}
              <span className="text-sm text-white">
                {user.username ?? "User"}
              </span>
              <button
                onClick={logout}
                className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 text-sm"
              >
                Logout
              </button>
            </div>
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

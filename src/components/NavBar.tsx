   import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const NavBar: React.FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-blue-600
              hover:text-blue-700
              transition
            "
          >
            TaskMaster Pro
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/dashboard"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition
              "
            >
              Dashboard
            </Link>

            <Link
              to="/projects"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition
              "
            >
              Projects
            </Link>

            <Link
              to="/reports"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition
              "
            >
              Reports
            </Link>

            <Link
              to="/notifications"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition
              "
            >
              🔔 Notifications
            </Link>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              Logout
            </button>

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              md:hidden
              text-3xl
              text-slate-700
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (

          <div
            className="
              md:hidden
              flex
              flex-col
              gap-4
              mt-5
              pb-4
              border-t
              pt-4
            "
          >

            <Link
              to="/dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                text-slate-700
                font-medium
              "
            >
              Dashboard
            </Link>

            <Link
              to="/projects"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                text-slate-700
                font-medium
              "
            >
              Projects
            </Link>

            <Link
              to="/reports"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                text-slate-700
                font-medium
              "
            >
              Reports
            </Link>

            <Link
              to="/notifications"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                text-slate-700
                font-medium
              "
            >
              🔔 Notifications
            </Link>

            <button
              onClick={handleLogout}
              className="
                w-full
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-lg
                transition
              "
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
};
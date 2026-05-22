  import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { NotificationList } from "./NotificationList";

export const NavBar: React.FC = () => {
  const { logout } = useAuth();

  const [showNotifications, setShowNotifications] =
    useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-blue-600
            hover:text-blue-700
            transition
          "
        >
          TaskMaster Pro
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
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

          {/* Notifications */}
          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              text-slate-700
              font-medium
              hover:text-blue-600
              transition
            "
          >
            🔔 Notifications
          </button>

          {/* Logout */}
          <button
            onClick={logout}
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

      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-6 top-20 z-50 w-96">
          <NotificationList />
        </div>
      )}

    </nav>
  );
};
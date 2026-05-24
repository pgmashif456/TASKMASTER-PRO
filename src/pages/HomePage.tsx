 import React, { useState } from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <h1
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-blue-600
              "
            >
              TaskMaster Pro
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">

              <a
                href="#features"
                className="
                  text-slate-600
                  hover:text-blue-600
                  transition
                "
              >
                Features
              </a>

              <a
                href="#pricing"
                className="
                  text-slate-600
                  hover:text-blue-600
                  transition
                "
              >
                Pricing
              </a>

              <Link
                to="/login"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >
                Login
              </Link>

            </div>

            {/* Mobile Menu Button */}
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
              ☰
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
                pb-4
              "
            >

              <a
                href="#features"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-slate-600"
              >
                Features
              </a>

              <a
                href="#pricing"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-slate-600"
              >
                Pricing
              </a>

              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-center
                "
              >
                Login
              </Link>

            </div>

          )}

        </div>

      </nav>

      {/* Hero Section */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-16
          md:py-24
          text-center
        "
      >

        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-bold
            text-slate-800
            leading-tight
          "
        >
          Manage Projects &
          <br />
          Tasks Efficiently 🚀
        </h1>

        <p
          className="
            text-slate-600
            text-base
            sm:text-lg
            mt-6
            max-w-3xl
            mx-auto
          "
        >
          Track projects, assign tasks,
          collaborate with your team and
          stay productive using
          TaskMaster Pro.
        </p>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
            mt-10
          "
        >

          <Link
            to="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-lg
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              border
              border-slate-300
              hover:bg-slate-100
              px-8
              py-3
              rounded-lg
              transition
            "
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}
      <section
        id="features"
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-20
        "
      >

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-center
            mb-12
          "
        >
          Why TaskMaster Pro?
        </h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          <div
            className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            "
          >
            <div className="text-4xl mb-3">
              📁
            </div>

            <h3 className="font-semibold">
              Unlimited Projects
            </h3>
          </div>

          <div
            className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            "
          >
            <div className="text-4xl mb-3">
              ✅
            </div>

            <h3 className="font-semibold">
              Task Management
            </h3>
          </div>

          <div
            className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            "
          >
            <div className="text-4xl mb-3">
              📊
            </div>

            <h3 className="font-semibold">
              Progress Tracking
            </h3>
          </div>

          <div
            className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            "
          >
            <div className="text-4xl mb-3">
              🔔
            </div>

            <h3 className="font-semibold">
              Real-Time Notifications
            </h3>
          </div>

        </div>

      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="
          max-w-4xl
          mx-auto
          px-4
          sm:px-6
          py-20
        "
      >

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-center
            mb-12
          "
        >
          Pricing
        </h2>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
            text-center
          "
        >

          <h3
            className="
              text-2xl
              font-bold
              mb-4
            "
          >
            Free Plan
          </h3>

          <p className="text-slate-600 mb-6">
            Perfect for students,
            freelancers and small teams.
          </p>

          <div
            className="
              text-5xl
              font-bold
              text-blue-600
            "
          >
            ₹0
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer
        className="
          bg-white
          border-t
          py-6
          text-center
          text-slate-500
        "
      >
        © 2025 TaskMaster Pro.
        All rights reserved.
      </footer>

    </div>
  );
};

export default HomePage;
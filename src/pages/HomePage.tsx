 import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-blue-600">
            TaskMaster Pro
          </h1>

          <div className="flex items-center gap-6">

            <a href="#features" className="text-slate-600 hover:text-blue-600">
              Features
            </a>

            <a href="#pricing" className="text-slate-600 hover:text-blue-600">
              Pricing
            </a>

            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>

          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-bold text-slate-800">
          Manage Projects & Tasks Efficiently 🚀
        </h1>

        <p className="text-slate-600 text-lg mt-6 max-w-2xl mx-auto">
          Track projects, assign tasks, collaborate with your team
          and stay productive using TaskMaster Pro.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-slate-300 px-6 py-3 rounded-lg"
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20"
      >

        <h2 className="text-3xl font-bold text-center mb-12">
          Why TaskMaster Pro?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            📁 Unlimited Projects
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            ✅ Task Management
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            📊 Progress Tracking
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🔔 Real-Time Notifications
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-slate-500">
        © 2025 TaskMaster Pro. All rights reserved.
      </footer>

    </div>
  );
};

export default HomePage;
 import React from "react";
import { Link } from "react-router-dom";

import { RegisterForm }
from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join TaskMaster Pro and start managing your projects efficiently.
          </p>

        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Login Link */}
        <div className="mt-6 text-center">

          <p className="text-slate-600">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-blue-600
                font-semibold
                hover:text-blue-700
                hover:underline
                transition
              "
            >
              Login
            </Link>

          </p>

        </div>

        {/* Footer */}
        <div className="mt-6 text-center">

          <p className="text-sm text-slate-500">
            Organize projects, collaborate with teams and track progress effortlessly.
          </p>

        </div>

      </div>

    </div>
  );
};
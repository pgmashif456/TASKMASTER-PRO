  import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-slate-800">
            TaskMaster Pro
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to continue
          </p>

        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="mt-6 text-center">
          
          <p className="text-sm text-slate-500">
            Manage projects, tasks and team collaboration efficiently.
          </p>

        </div>

      </div>

    </div>
  );
};
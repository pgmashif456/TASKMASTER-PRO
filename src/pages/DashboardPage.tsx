  import React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back to TaskMaster Pro 🚀
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm">
              Total Projects
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm">
              Active Tasks
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm">
              Completed Tasks
            </h3>

            <p className="text-3xl font-bold text-purple-600 mt-2">
              0
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Create Project
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
              Create Task
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition">
              View Reports
            </button>

          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Recent Activity
          </h2>

          <p className="text-slate-500">
            No recent activity available.
          </p>
        </div>

      </div>
    </div>
  );
};
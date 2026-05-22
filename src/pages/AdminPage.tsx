  import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Manage users, projects, tasks and system settings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500 text-sm">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500 text-sm">
              Total Projects
            </h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500 text-sm">
              Total Tasks
            </h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              0
            </p>
          </div>

        </div>

        {/* Admin Controls */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Admin Controls
          </h2>

          <p className="text-slate-600 mb-6">
            Here you can manage users, roles, projects and monitor system activity.
          </p>

          <div className="flex flex-wrap gap-4">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Manage Users
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
              View Projects
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition">
              System Reports
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
  import React from "react";

import { ProjectCreate }
from "../components/ProjectCreate";

import { ProjectList }
from "../components/ProjectList";

export const ProjectsPage: React.FC = () => {

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Projects
          </h1>

          <p className="text-slate-500 mt-2">
            Create, manage and track all your projects in one place.
          </p>

        </div>

        {/* Create Project Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Create New Project
          </h2>

          <ProjectCreate />

        </div>

        {/* Project List Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-semibold text-slate-800">
              Your Projects
            </h2>

            <span className="text-sm text-slate-500">
              Active Projects
            </span>

          </div>

          <ProjectList />

        </div>

      </div>

    </div>
  );
};
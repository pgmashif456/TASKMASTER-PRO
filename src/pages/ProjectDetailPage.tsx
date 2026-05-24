 
  import React, { useState } from "react";

import { useParams } from "react-router-dom";

import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { TaskList } from "../components/TaskList";
import { TaskCreateEdit } from "../components/TaskCreateEdit";

export const ProjectDetailPage: React.FC = () => {

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("");

  const [showTaskForm, setShowTaskForm] =
    useState(false);

  if (!projectId) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="bg-white p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold text-red-500">
            Project not found
          </h2>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Project Details
          </h1>

          <p className="text-slate-500 mt-2">
            Manage tasks, search work items and track progress.
          </p>

        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Search & Filters
          </h2>

          <div className="space-y-4">

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search tasks..."
            />

            <FilterPanel
              status={statusFilter}
              setStatus={setStatusFilter}
              priority={priorityFilter}
              setPriority={setPriorityFilter}
            />

          </div>

        </div>

        {/* Create Task */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-semibold text-slate-800">
              Task Management
            </h2>

            <button
              onClick={() =>
                setShowTaskForm(
                  !showTaskForm
                )
              }
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              {showTaskForm
                ? "Close Form"
                : "Create Task"}
            </button>

          </div>

          {showTaskForm && (

            <div className="mt-6 border-t pt-6">

              <TaskCreateEdit
                projectId={projectId}
                onComplete={() =>
                  setShowTaskForm(false)
                }
              />

            </div>

          )}

        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-semibold text-slate-800">
              Project Tasks
            </h2>

            <span className="text-sm text-slate-500">
              Filtered Results
            </span>

          </div>

          <TaskList
            projectId={projectId}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />

        </div>

      </div>

    </div>
  );
};
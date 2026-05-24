  import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  useNavigate,
} from "react-router-dom";

import { db } from "../api/firebase";
import { useAuth } from "../contexts/AuthContext";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [
    totalProjects,
    setTotalProjects,
  ] = useState(0);

  const [
    activeTasks,
    setActiveTasks,
  ] = useState(0);

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState(0);

  const [
    recentProjects,
    setRecentProjects,
  ] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const projectsQuery = query(
      collection(db, "projects"),
      where(
        "ownerId",
        "==",
        user.uid
      )
    );

    const unsubscribeProjects =
      onSnapshot(
        projectsQuery,
        (snapshot) => {
          setTotalProjects(
            snapshot.size
          );

          const projects =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setRecentProjects(
            projects.slice(0, 5)
          );
        }
      );

    const unsubscribeTasks =
      onSnapshot(
        collection(db, "tasks"),
        (snapshot) => {

          const active =
            snapshot.docs.filter(
              (doc) =>
                doc.data().status !==
                "completed"
            ).length;

          const completed =
            snapshot.docs.filter(
              (doc) =>
                doc.data().status ===
                "completed"
            ).length;

          setActiveTasks(active);

          setCompletedTasks(
            completed
          );
        }
      );

    return () => {
      unsubscribeProjects();
      unsubscribeTasks();
    };
  }, [user]);

  return (
     <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

  <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Welcome back to TaskMaster Pro 🚀
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

          <div className="
  bg-white
  rounded-xl
  shadow-md
  p-5
  sm:p-6
">


            <h3 className="text-gray-500 text-sm">
              Total Projects
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {totalProjects}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 text-sm">
              Active Tasks
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {activeTasks}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h3 className="text-gray-500 text-sm">
              Completed Tasks
            </h3>

            <p className="text-3xl font-bold text-purple-600 mt-2">
              {completedTasks}
            </p>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">

          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">

            {/* Create Project */}
            <button
              onClick={() =>
                navigate("/projects")
              }
              className="
  w-full
  sm:w-auto
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-5
  py-3
  rounded-lg
  transition
"
            >
              Create Project
            </button>

            {/* Create Task */}
            <button
              onClick={() => {

                const latestProject =
                  recentProjects[0];

                if (!latestProject) {
                  alert(
                    "Create a project first."
                  );
                  return;
                }

                navigate(
                  `/projects/${latestProject.id}`
                );
              }}
               className="
  w-full
  sm:w-auto
  bg-green-600
  hover:bg-green-700
  text-white
  px-5
  py-3
  rounded-lg
  transition
"
            >
              Create Task
            </button>

            {/* Reports */}
            <button
              onClick={() =>
                navigate("/reports")
              }
             className="
  w-full
  sm:w-auto
  bg-purple-600
  hover:bg-purple-700
  text-white
  px-5
  py-3
  rounded-lg
  transition
"
            >
              View Reports
            </button>

          </div>

        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Recent Projects
          </h2>

          {recentProjects.length === 0 ? (

            <p className="text-slate-500">
              No projects found.
            </p>

          ) : (

            <div className="space-y-4">

              {recentProjects.map(
                (project: any) => (

                  <div
                    key={project.id}
                     className="
  flex
  flex-col
  sm:flex-row
  sm:items-center
  sm:justify-between
  gap-4
  border-b
  pb-4
"
                  >
                    <div>

                      <h3 className="font-semibold text-lg">
                        {project.name}
                      </h3>

                      <p className="text-sm text-slate-500 break-words">
                        {
                          project.description
                        }
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/projects/${project.id}`
                        )
                      }
                       className="
  w-full
  sm:w-auto
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-4
  py-2
  rounded-lg
  transition
"
                    >
                      Open
                    </button>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
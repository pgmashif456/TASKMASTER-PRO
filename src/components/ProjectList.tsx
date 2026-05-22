 import React, { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../api/firebase";
import { useAuth } from "../contexts/AuthContext";

interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId?: string;
}

export const ProjectList: React.FC = () => {
  const { user } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log("❌ User not found");
      return;
    }

    console.log("✅ Current User UID:", user.uid);

    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log(
          "📁 Projects Found:",
          snapshot.size
        );

        const projectData = snapshot.docs.map(
          (doc) => {
            console.log(
              "Project:",
              doc.id,
              doc.data()
            );

            return {
              id: doc.id,
              ...(doc.data() as Omit<
                Project,
                "id"
              >),
            };
          }
        );

        setProjects(projectData);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Firestore Error:",
          error
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-10">
        User not logged in
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading projects...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Your Projects
        </h2>

        <span
          className="
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          {projects.length} Project
          {projects.length !== 1 && "s"}
        </span>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div
          className="
            bg-slate-50
            border
            border-dashed
            border-slate-300
            rounded-xl
            p-10
            text-center
          "
        >
          <h3 className="text-lg font-medium text-slate-700">
            No Projects Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first project
            to get started.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                p-5
                shadow-sm
                hover:shadow-lg
                transition
              "
            >
              <h3
                className="
                  text-xl
                  font-semibold
                  text-slate-800
                  mb-2
                "
              >
                {project.name}
              </h3>

              <p
                className="
                  text-slate-600
                  text-sm
                  mb-4
                "
              >
                {project.description ||
                  "No description provided"}
              </p>

              <button
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  transition
                "
              >
                View Project
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
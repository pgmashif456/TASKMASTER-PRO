  import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  useNavigate,
} from "react-router-dom";

import { db } from "../api/firebase";

import { useAuth }
from "../contexts/AuthContext";

interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId?: string;
}

export const ProjectList:
React.FC = () => {

  const { user } = useAuth();

  const navigate =
    useNavigate();

  const [projects,
    setProjects] = useState<
      Project[]
    >([]);

  const [loading,
    setLoading] =
      useState(true);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [
    editingProject,
    setEditingProject,
  ] = useState<Project | null>(
    null
  );

  const [
    editName,
    setEditName,
  ] = useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  useEffect(() => {

    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(
        db,
        "projects"
      ),

      where(
        "ownerId",
        "==",
        user.uid
      ),

      orderBy(
        "createdAt",
        "desc"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,

                ...(doc.data() as Omit<
                  Project,
                  "id"
                >),
              })
            );

          setProjects(data);
          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [user]);

  const handleDelete =
    async (
      projectId: string
    ) => {

      const confirmDelete =
        window.confirm(
          "Delete this project?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "projects",
            projectId
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete project"
        );
      }
    };

  const handleUpdateProject =
    async () => {

      if (
        !editingProject
      )
        return;

      if (
        !editName.trim()
      ) {

        alert(
          "Project name is required"
        );

        return;
      }

      try {

        await updateDoc(
          doc(
            db,
            "projects",
            editingProject.id
          ),
          {
            name:
              editName.trim(),

            description:
              editDescription.trim(),

            updatedAt:
              serverTimestamp(),
          }
        );

        setShowEditModal(
          false
        );

        setEditingProject(
          null
        );

        alert(
          "Project updated successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update project"
        );
      }
    };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {projects.map(
          (project) => (

            <div
              key={project.id}
              className="
                bg-white
                border
                rounded-xl
                p-5
                shadow-sm
                hover:shadow-lg
                transition
                min-h-[260px]
                flex
                flex-col
                justify-between
              "
            >
              <div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    mb-3
                    break-words
                  "
                >
                  {project.name}
                </h3>

                <p
                  className="
                    text-slate-600
                    break-words
                    whitespace-pre-wrap
                    line-clamp-4
                  "
                >
                  {project.description ||
                    "No description"}
                </p>

              </div>

              <div className="flex gap-2 mt-6">

                <button
                  onClick={() =>
                    navigate(
                      `/projects/${project.id}`
                    )
                  }
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  View
                </button>

                <button
                  onClick={() => {

                    setEditingProject(
                      project
                    );

                    setEditName(
                      project.name
                    );

                    setEditDescription(
                      project.description ||
                        ""
                    );

                    setShowEditModal(
                      true
                    );
                  }}
                  className="
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      project.id
                    )
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Delete
                </button>

              </div>
            </div>
          )
        )}
      </div>

      {/* EDIT MODAL */}

      {showEditModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-xl
              p-6
              w-full
              max-w-lg
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-5
              "
            >
              Edit Project
            </h2>

            <input
              value={editName}
              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }
              placeholder="Project Name"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                mb-4
              "
            />

            <textarea
              rows={5}
              value={
                editDescription
              }
              onChange={(e) =>
                setEditDescription(
                  e.target.value
                )
              }
              placeholder="Project Description"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                resize-none
              "
            />

            <div
              className="
                flex
                justify-end
                gap-3
                mt-5
              "
            >
              <button
                onClick={() =>
                  setShowEditModal(
                    false
                  )
                }
                className="
                  border
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleUpdateProject
                }
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Save Changes
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
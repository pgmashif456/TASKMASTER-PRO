   import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { TaskCreateEdit } from "./TaskCreateEdit";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignedTo?: string;
  dueDate?: string;
}

interface Props {
  projectId: string;
  searchTerm?: string;
  statusFilter?: string;
  priorityFilter?: string;
}

export const TaskList: React.FC<Props> = ({
  projectId,
  searchTerm = "",
  statusFilter = "",
  priorityFilter = "",
}) => {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [showCommentsFor, setShowCommentsFor] =
    useState<string | null>(null);

  // Lock background scroll when modal open
  useEffect(() => {

    if (editingTask) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [editingTask]);

  useEffect(() => {

    const q = query(
      collection(db, "tasks"),
      where(
        "projectId",
        "==",
        projectId
      )
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const filteredTasks =
          snapshot.docs

            .map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<
                Task,
                "id"
              >),
            }))

            .filter((task) => {

  const search =
    searchTerm.trim().toLowerCase();

  const title =
    task.title?.toLowerCase() || "";

  const description =
    task.description?.toLowerCase() || "";

  const matchesSearch =
    search === "" ||
    title.includes(search) ||
    description.includes(search);

  const matchesStatus =
    statusFilter === "" ||
    task.status === statusFilter;

  const matchesPriority =
    priorityFilter === "" ||
    task.priority === priorityFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority
  );
})

        setTasks(filteredTasks);
      });

    return () =>
      unsubscribe();

  }, [
    projectId,
    searchTerm,
    statusFilter,
    priorityFilter,
  ]);

  const handleDeleteTask =
    async (taskId: string) => {

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete) return;

      try {

        await deleteDoc(
          doc(db, "tasks", taskId)
        );

        alert(
          "Task deleted successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete task"
        );
      }
    };

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "completed":
        return "bg-green-100 text-green-700";

      case "in-progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getPriorityStyle = (
    priority: string
  ) => {

    switch (priority) {

      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (

    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-slate-800">
          Tasks
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
          {tasks.length} Task
          {tasks.length !== 1 && "s"}
        </span>

      </div>

      {/* Empty State */}

      {tasks.length === 0 ? (

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
            No Tasks Found
          </h3>

          <p className="text-slate-500 mt-2">
            Create a task or adjust your filters.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {tasks.map((task) => (

            <div
              key={task.id}
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                p-5
                shadow-sm
                hover:shadow-md
                transition
              "
            >

              <h3
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                  mb-3
                "
              >
                {task.title}
              </h3>

              <p
                className="
                  text-slate-600
                  text-sm
                  mb-4
                  break-words
                "
              >
                {task.description ||
                  "No description provided"}
              </p>

              <div className="flex gap-2 flex-wrap mb-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${getStatusStyle(
                      task.status
                    )}
                  `}
                >
                  {task.status}
                </span>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${getPriorityStyle(
                      task.priority
                    )}
                  `}
                >
                  {task.priority}
                </span>

              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    setEditingTask(task)
                  }
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDeleteTask(
                      task.id
                    )
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    setShowCommentsFor(
                      showCommentsFor === task.id
                        ? null
                        : task.id
                    )
                  }
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  {showCommentsFor === task.id
                    ? "Hide Comments"
                    : "Comments"}
                </button>

              </div>

              {/* Comments */}

              {showCommentsFor === task.id && (

                <div className="mt-6 space-y-4">

                  <CommentForm
                    taskId={task.id}
                  />

                  <CommentList
                    taskId={task.id}
                  />

                </div>

              )}

            </div>

          ))}

        </div>

      )}

      {/* Edit Modal */}

       {editingTask && (

  <div
    className="
      fixed
      inset-0
      z-50
      bg-black/50
      overflow-y-auto
    "
  >

    <div
      className="
        min-h-screen
        flex
        items-start
        justify-center
        py-10
        px-4
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          w-full
          max-w-3xl
          p-6
        "
      >

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold text-slate-800">
                Edit Task
              </h2>

              <button
                onClick={() =>
                  setEditingTask(null)
                }
                className="
                  text-slate-500
                  hover:text-red-500
                  text-2xl
                "
              >
                ✕
              </button>

            </div>

            <TaskCreateEdit
              projectId={projectId}
              taskId={editingTask.id}
              existingData={{
                title:
                  editingTask.title,

                description:
                  editingTask.description,

                assignedTo:
                  editingTask.assignedTo || "",

                status:
                  editingTask.status as any,

                priority:
                  editingTask.priority as any,

                dueDate:
                  editingTask.dueDate || "",
              }}
              onComplete={() =>
                setEditingTask(null)
              }
            />

                 </div>
    </div>
  </div>

)}
    </div>
  );
};
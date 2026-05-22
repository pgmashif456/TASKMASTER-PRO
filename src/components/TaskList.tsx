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

import { db } from "../api/firebase";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
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

              const matchesSearch =

                !searchTerm ||

                task.title
                  .toLowerCase()
                  .includes(
                    searchTerm.toLowerCase()
                  ) ||

                task.description
                  ?.toLowerCase()
                  .includes(
                    searchTerm.toLowerCase()
                  );

              const matchesStatus =

                !statusFilter ||

                task.status ===
                  statusFilter;

              const matchesPriority =

                !priorityFilter ||

                task.priority ===
                  priorityFilter;

              return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
              );
            });

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
            Create a task or adjust
            your filters.
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

              <div className="flex items-start justify-between mb-3">

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-slate-800
                  "
                >
                  {task.title}
                </h3>

              </div>

              <p
                className="
                  text-slate-600
                  text-sm
                  mb-4
                "
              >
                {task.description ||
                  "No description provided."}
              </p>

              <div className="flex gap-2 flex-wrap">

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

            </div>

          ))}

        </div>

      )}

    </div>
  );
};
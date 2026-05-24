  import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

import { notifyUser } from "../utils/notifications";

interface TaskForm {
  title: string;
  description?: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface Props {
  projectId: string;
  taskId?: string;
  existingData?: TaskForm;
  onComplete?: () => void;
}

export const TaskCreateEdit: React.FC<Props> = ({
  projectId,
  taskId,
  existingData,
  onComplete,
}) => {

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TaskForm>({
    defaultValues:
      existingData || {
        title: "",
        description: "",
        assignedTo: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      },
  });

  useEffect(() => {

    if (existingData) {

      for (const [key, value] of Object.entries(existingData)) {

        setValue(
          key as keyof TaskForm,
          value as never
        );
      }
    }

  }, [existingData, setValue]);

  const onSubmit = async (
    data: TaskForm
  ) => {

    if (!user) return;

    try {

      if (taskId) {

        const taskRef =
          doc(db, "tasks", taskId);

        await updateDoc(taskRef, {
          ...data,
          updatedAt:
            serverTimestamp(),
        });

        await notifyUser(
          data.assignedTo,
          `Task updated: ${data.title}`
        );

      } else {

        await addDoc(
          collection(db, "tasks"),
          {
            ...data,
            projectId,
            createdAt:
              serverTimestamp(),
            updatedAt:
              serverTimestamp(),
          }
        );

        await notifyUser(
          data.assignedTo,
          `New task assigned: ${data.title}`
        );
      }

      reset();

      if (onComplete) {
        onComplete();
      }

       alert(
  taskId
    ? "Task updated successfully"
    : "Task created successfully"
);

    } catch (error) {

      alert(
        "Failed to save task: " +
        (error as Error).message
      );
    }
  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Title */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Task Title
        </label>

        <input
          {...register("title", {
            required:
              "Task title is required",
          })}
          placeholder="Enter task title"
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}

      </div>

      {/* Description */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Task description"
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* Assigned User */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Assign To
        </label>

        <input
          {...register("assignedTo", {
            required:
              "User ID is required",
          })}
          placeholder="Enter user ID"
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>

          <select
            {...register("status")}
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
            "
          >
            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

        </div>

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Priority
          </label>

          <select
            {...register("priority")}
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
            "
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>

        </div>

      </div>

      {/* Due Date */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Due Date
        </label>

        <input
          type="date"
          {...register("dueDate")}
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
          "
        />

      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-lg
          font-medium
          transition
          disabled:bg-slate-400
        "
      >
        {isSubmitting
          ? "Saving..."
          : taskId
          ? "Update Task"
          : "Create Task"}
      </button>

    </form>
  );
};
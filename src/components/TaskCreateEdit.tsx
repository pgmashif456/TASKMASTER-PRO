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

interface TaskForm {
  title: string;

  description?: string;

  assignedTo: string;

  status:
    | "pending"
    | "in-progress"
    | "completed";

  priority:
    | "low"
    | "medium"
    | "high";

  dueDate: string;
}

interface Props {
  projectId: string;

  taskId?: string;

  existingData?: TaskForm;

  onComplete?: () => void;
}

export const TaskCreateEdit:
React.FC<Props> = ({

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

      for (const [key, value]
      of Object.entries(existingData)) {

        setValue(
          key as keyof TaskForm,
          value as never
        );
      }
    }

  }, [existingData, setValue]);

  // ✅ FIXED FUNCTION
  const onSubmit = async (
    data: TaskForm
  ) => {

    if (!user) return;

    try {

      if (taskId) {

        // Update Task
        const taskRef =
          doc(db, "tasks", taskId);

        await updateDoc(taskRef, {

          ...data,

          updatedAt:
            serverTimestamp(),
        });

      } else {

        // Create Task
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
      }

      reset();

      if (onComplete) {
        onComplete();
      }

      alert(
        `Task ${
          taskId
            ? "updated"
            : "created"
        } successfully`
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
      onSubmit={
        handleSubmit(onSubmit)
      }
    >

      <input
        {...register("title", {
          required: true,
        })}
        placeholder="Title"
      />

      <br />

      <textarea
        {...register("description")}
        placeholder="Description"
      />

      <br />

      <input
        {...register("assignedTo", {
          required: true,
        })}
        placeholder="Assign to (user ID)"
      />

      <br />

      <select {...register("status")}>

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

      <br />

      <select
        {...register("priority")}
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

      <br />

      <input
        type="date"
        {...register("dueDate")}
      />

      <br />

      <button type="submit">

        {taskId
          ? "Update Task"
          : "Create Task"}

      </button>

    </form>
  );
};
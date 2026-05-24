  import React from "react";

import { useForm } from "react-hook-form";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

interface ProjectForm {
  name: string;
  description?: string;
}

export const ProjectCreate: React.FC = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ProjectForm>();

  const onSubmit = async (
    data: ProjectForm
  ) => {
    if (!user) return;

    try {
      await addDoc(
        collection(db, "projects"),
        {
          name: data.name,
          description:
            data.description || "",

          ownerId: user.uid,

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

      reset();

      alert(
        "Project created successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create project"
      );
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit(onSubmit)
      }
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Project Name
        </label>

        <input
          {...register("name", {
            required:
              "Project name is required",
          })}
          placeholder="Enter project name"
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
          "
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description
        </label>

        <textarea
          {...register(
            "description"
          )}
          rows={4}
          placeholder="Project description..."
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            resize-none
          "
        />
      </div>

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
          transition
        "
      >
        {isSubmitting
          ? "Creating..."
          : "Create Project"}
      </button>
    </form>
  );
};
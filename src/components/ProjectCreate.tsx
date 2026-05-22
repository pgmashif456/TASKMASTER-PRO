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
          ...data,

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

      alert(
        "Failed to create project: " +
        (error as Error).message
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

      {/* Project Name */}
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
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />

        {errors.name && (

          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
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
          placeholder="Describe your project..."
          rows={4}
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
            focus:border-blue-500
          "
        />

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          py-3
          rounded-lg
          transition
          duration-200
          disabled:bg-slate-400
          disabled:cursor-not-allowed
        "
      >

        {isSubmitting
          ? "Creating..."
          : "Create Project"}

      </button>

    </form>
  );
};
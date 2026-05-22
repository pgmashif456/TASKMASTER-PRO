 import React from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";
import { useAuth } from "../contexts/AuthContext";

interface CommentFormInputs {
  text: string;
}

interface Props {
  taskId: string;
}

export const CommentForm: React.FC<Props> = ({
  taskId,
}) => {

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CommentFormInputs>();

  const onSubmit = async (
    data: CommentFormInputs
  ) => {

    if (!user) return;

    try {

      await addDoc(
        collection(
          db,
          "tasks",
          taskId,
          "comments"
        ),
        {
          userId: user.uid,
          text: data.text,
          createdAt:
            serverTimestamp(),
        }
      );

      reset();

    } catch (error) {

      alert(
        "Failed to add comment: " +
        (error as Error).message
      );
    }
  };

  return (

    <div className="bg-white rounded-xl shadow-md p-5">

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Add Comment
      </h3>

      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
        className="space-y-4"
      >

        <textarea
          {...register("text", {
            required:
              "Comment cannot be empty",
          })}
          placeholder="Write your comment..."
          rows={4}
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            p-3
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-medium
            px-5
            py-2
            rounded-lg
            transition
            duration-200
          "
        >
          Add Comment
        </button>

      </form>

    </div>
  );
};
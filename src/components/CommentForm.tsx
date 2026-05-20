 import React from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../api/firebase";
import { useAuth } from "../contexts/AuthContext";

interface CommentFormInputs {
  text: string;
}

interface Props {
  taskId: string;
}

export const CommentForm: React.FC<Props> = ({ taskId }) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<CommentFormInputs>();

  const onSubmit = async (data: CommentFormInputs) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "tasks", taskId, "comments"), {
        userId: user.uid,
        text: data.text,
        createdAt: serverTimestamp(),
      });
      reset();
    } catch (error) {
      alert("Failed to add comment: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("text", { required: "Comment cannot be empty" })}
        placeholder="Write a comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};
 import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import { db } from "../api/firebase";

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  projectId: string;
}

export const useTasks = () => {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "tasks")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Task)
        );

        setTasks(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const activeTasks =
    tasks.filter(
      (task) =>
        task.status !== "completed"
    );

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    );

  return {
    tasks,
    loading,
    activeTasks,
    completedTasks,
    activeCount:
      activeTasks.length,
    completedCount:
      completedTasks.length,
  };
};
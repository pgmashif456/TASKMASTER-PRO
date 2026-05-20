 import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface Props {
  projectId: string;
}

export const TaskList: React.FC<Props> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));
      setTasks(taskData);
    });
    return () => unsubscribe();
  }, [projectId]);

  const deleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <div>
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks for this project.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.status} — Priority: {task.priority}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
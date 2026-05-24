 import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../api/firebase";

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt?: unknown;
}

export const useProjects = (
  userId?: string
) => {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!userId) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", userId)
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Project)
        );

        setProjects(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  return {
    projects,
    loading,
    totalProjects: projects.length,
  };
};
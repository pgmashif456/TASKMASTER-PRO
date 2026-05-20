 import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../api/firebase";

interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: any;
}

interface Props {
  taskId: string;
}

export const CommentList: React.FC<Props> = ({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "tasks", taskId, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, "id">),
      }));
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, [taskId]);

  return (
    <div>
      <h4>Comments</h4>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.userId}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
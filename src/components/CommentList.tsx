   import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

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

export const CommentList: React.FC<Props> = ({
  taskId,
}) => {

  const [comments, setComments] =
    useState<Comment[]>([]);

  useEffect(() => {

    const q = query(
      collection(
        db,
        "tasks",
        taskId,
        "comments"
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const commentsData =
          snapshot.docs.map((doc) => ({

            id: doc.id,

            ...(doc.data() as Omit<
              Comment,
              "id"
            >),
          }));

        setComments(commentsData);
      });

    return () => unsubscribe();

  }, [taskId]);

  return (

    <div className="bg-white rounded-xl shadow-md p-5">

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Comments
      </h3>

      {comments.length === 0 ? (

        <div className="text-slate-500 text-center py-6">
          No comments yet.
        </div>

      ) : (

        <div className="space-y-4">

          {comments.map((comment) => (

            <div
              key={comment.id}
              className="
                border
                border-slate-200
                rounded-lg
                p-4
                bg-slate-50
              "
            >

              <div className="flex items-center justify-between mb-2">

                <span className="font-medium text-blue-600">
                  {comment.userId}
                </span>

              </div>

              <p className="text-slate-700 break-words">
                {comment.text}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};
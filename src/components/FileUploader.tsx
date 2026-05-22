 import React, { useState } from "react";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  storage,
  db,
} from "../api/firebase";

import { useAuth }
from "../contexts/AuthContext";

interface Props {
  taskId: string;
}

export const FileUploader:
React.FC<Props> = ({
  taskId,
}) => {

  const { user } = useAuth();

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState(0);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!user) return;

    if (
      !e.target.files ||
      e.target.files.length === 0
    ) {
      return;
    }

    const file =
      e.target.files[0];

    const storageRef = ref(
      storage,
      `taskAttachments/${taskId}/${file.name}`
    );

    const uploadTask =
      uploadBytesResumable(
        storageRef,
        file
      );

    uploadTask.on(
      "state_changed",

      (snapshot) => {

        const progress =
          (
            snapshot.bytesTransferred /
            snapshot.totalBytes
          ) * 100;

        setUploadProgress(
          progress
        );
      },

      (error) => {

        alert(
          "Upload failed: " +
          error.message
        );
      },

      async () => {

        const downloadURL =
          await getDownloadURL(
            uploadTask.snapshot.ref
          );

        await addDoc(
          collection(
            db,
            "tasks",
            taskId,
            "attachments"
          ),
          {
            fileName:
              file.name,

            fileURL:
              downloadURL,

            uploadedAt:
              serverTimestamp(),

            userId:
              user.uid,
          }
        );

        setUploadProgress(0);

        alert(
          "File uploaded successfully"
        );
      }
    );
  };

  return (

    <div className="bg-white rounded-xl shadow-md p-5">

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Upload Attachment
      </h3>

      <label
        className="
          flex
          items-center
          justify-center
          w-full
          p-6
          border-2
          border-dashed
          border-slate-300
          rounded-xl
          cursor-pointer
          hover:border-blue-500
          hover:bg-slate-50
          transition
        "
      >

        <span className="text-slate-600">
          Select a file to upload
        </span>

        <input
          type="file"
          onChange={
            handleFileChange
          }
          className="hidden"
        />

      </label>

      {uploadProgress > 0 && (

        <div className="mt-4">

          <div className="w-full bg-slate-200 rounded-full h-3">

            <div
              className="
                bg-blue-600
                h-3
                rounded-full
                transition-all
              "
              style={{
                width:
                  `${uploadProgress}%`,
              }}
            />

          </div>

          <p className="text-sm text-slate-600 mt-2">
            Uploading...
            {" "}
            {uploadProgress.toFixed(0)}%
          </p>

        </div>
      )}

    </div>
  );
};
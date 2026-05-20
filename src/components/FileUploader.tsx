 import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../api/firebase";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  taskId: string;
}

export const FileUploader: React.FC<Props> = ({ taskId }) => {
  const { user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const storageRef = ref(storage, `taskAttachments/${taskId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert("Upload failed: " + error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "tasks", taskId, "attachments"), {
          fileName: file.name,
          fileURL: downloadURL,
          uploadedAt: serverTimestamp(),
          userId: user.uid,
        });
        setUploadProgress(0);
        alert("File uploaded successfully");
      }
    );
  };

  return (
    <div>
      <input type="file" />
      {uploadProgress > 0 && <p>Upload progress: {uploadProgress.toFixed(0)}%</p>}
    </div>
  );
};
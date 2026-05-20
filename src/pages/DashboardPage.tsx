import React from "react";
import { auth, db } from "../api/firebase";

export const DashboardPage: React.FC = () => {
  console.log("Firebase Auth instance:", auth);
  console.log("Firestore DB instance:", db);

  return <div>Dashboard loaded. Check console for Firebase instances.</div>;
};
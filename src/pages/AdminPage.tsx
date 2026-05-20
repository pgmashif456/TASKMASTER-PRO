 import React from "react";

import { useAuth } from "../contexts/AuthContext";

const AdminPage: React.FC = () => {

  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <div>
      Welcome to Admin Panel 🚀
    </div>
  );
};

export default AdminPage;
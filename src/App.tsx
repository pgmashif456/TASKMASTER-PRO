  
import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";

import { RegisterPage } from "./pages/RegisterPage";

import { PrivateRoute } from "./routes/PrivateRoute";

import AdminPage from "./pages/AdminPage";

const DashboardPage = () => {
  return <div>Dashboard - Welcome!</div>;
};

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminPage />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;
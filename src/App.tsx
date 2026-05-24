  
   import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";

import { LoginPage }
from "./pages/LoginPage";

import { RegisterPage }
from "./pages/RegisterPage";

import { DashboardPage }
from "./pages/DashboardPage";

import { ProjectsPage }
from "./pages/ProjectsPage";

import {
  ProjectDetailPage,
} from "./pages/ProjectDetailPage";

import AdminPage
from "./pages/AdminPage";

import ReportsPage
from "./pages/ReportsPage";

import NotificationsPage
from "./pages/NotificationsPage";

import {
  PrivateRoute,
} from "./routes/PrivateRoute";

import {
  NavBar,
} from "./components/NavBar";

function App() {

  return (

    <Routes>

      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* ========================= */}
      {/* Protected Routes */}
      {/* ========================= */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <>
              <NavBar />
              <DashboardPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <>
              <NavBar />
              <ProjectsPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Project Detail */}
      <Route
        path="/projects/:projectId"
        element={
          <PrivateRoute>
            <>
              <NavBar />
              <ProjectDetailPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Notifications Page */}
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <>
              <NavBar />
              <NotificationsPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Reports Page */}
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <>
              <NavBar />
              <ReportsPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute
            allowedRoles={["admin"]}
          >
            <>
              <NavBar />
              <AdminPage />
            </>
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;
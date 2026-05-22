  
  import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import { LoginPage }
from "./pages/LoginPage";

import { RegisterPage }
from "./pages/RegisterPage";

import { ProjectsPage }
from "./pages/ProjectsPage";

import {
  ProjectDetailPage
} from "./pages/ProjectDetailPage";

import {
  PrivateRoute
} from "./routes/PrivateRoute";

import AdminPage
from "./pages/AdminPage";

import { NavBar }
from "./components/NavBar";

import {
  DashboardPage
} from "./pages/DashboardPage";

function App() {

  return (

    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Register */}
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>

            <>
              <NavBar />
              <DashboardPage />
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

      {/* Project Details */}
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

    </Routes>
  );
}

export default App;

 
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOTP from "@/pages/auth/VerifyOTP";

import Dashboard from "@/pages/dashboard/Dashboard";
import ResumeList from "@/pages/resume/ResumeList";
import ResumeBuilder from "@/pages/resume/ResumeBuilder";
import ResumeEditor from "@/pages/resume/ResumeEditor";
import Settings from "@/pages/settings/Settings";
import resumeList from "@/pages/resume/resumeList";
import resumeBuilder from "@/pages/resume/resumeBuilder";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<ResumeList />} />

        <Route path="/resume/new" element={<ResumeBuilder />} />

        <Route path="/resume/:id" element={<ResumeEditor />} />

        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
import React from "react";
import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "../protected/route";

export default async function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

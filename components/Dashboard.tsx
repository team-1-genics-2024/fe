import React from "react";
import Layout from "./layout/Layout";

export default function Dashboard() {
  return (
    <Layout withNavbar withFooter>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-xl">Welcome,</h2>
            <p className="text-gray-600">Manage your account here</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

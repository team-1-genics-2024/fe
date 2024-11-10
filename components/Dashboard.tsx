"use client";

import Layout from "@/components/layout/Layout";
import React from "react";
import { WithFullPageLoadingScreen } from "@/components/layout/loading-screen";

export default function Dashboard() {
  return (
    <WithFullPageLoadingScreen>
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
    </WithFullPageLoadingScreen>
  );
}

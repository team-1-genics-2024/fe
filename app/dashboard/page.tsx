import React from "react";
import Dashboard from "@/components/Dashboard";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider session={session}>
      <Dashboard />
    </SessionProvider>
  );
}

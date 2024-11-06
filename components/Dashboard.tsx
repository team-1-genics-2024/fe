"use client";

import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession, signOut } from "next-auth/react";
import SessionData from "./session-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const UpdateForm = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(`New ${session?.user?.name}`);

  if (!session?.user) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Update Session</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          update({ user: { name } });
        }}
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
      showToast("Successfully logged out");
      router.replace("/");
    } catch (error) {
      showToast("Error signing out", "error");
    }
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-xl">Welcome, {session?.user?.name}</h2>
            <p className="text-gray-600">Manage your account here</p>
          </div>
          <Button onClick={handleSignOut} variant="destructive">
            Sign out
          </Button>
        </div>

        {status === "loading" ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="space-y-8">
            <SessionData session={session} />
            <UpdateForm />
          </div>
        )}
      </div>

      <Button>
        <Link href="/profile">Profile</Link>
      </Button>
    </Layout>
  );
}

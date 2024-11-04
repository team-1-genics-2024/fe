"use client";
import Layout from "@/components/layout/Layout";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

function Dashboard() {
  const router = useRouter();

  const handleLoutOut = () => {
    showToast("Successfully logged out");
    router.replace("/login");
  };

  return (
    <Layout withNavbar={false} withFooter={true}>
      <div className="text-center w-full bottom-2 h-full text-red-600">
        <h1> this is a Dashboard</h1>
        <button>
          <h2 onClick={handleLoutOut}>Log out</h2>
        </button>
      </div>
    </Layout>
  );
}

export default Dashboard;

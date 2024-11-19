import React from "react";
import TopicsPage from "@/components/Topics";

export default async function page({}: { params: { classId: string } }) {
  return <TopicsPage />;
}

// classId = ambil id cari class, buat topic section

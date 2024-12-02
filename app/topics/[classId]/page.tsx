import React from "react";
import TopicsPage from "@/app/topics/page";

export default async function page({}: { params: { classId: string } }) {
  return <TopicsPage />;
}

// classId = ambil id cari class, buat topic section

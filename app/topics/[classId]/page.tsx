import React from "react";
import Classes from "@/components/Classes";
import TopicsPage from "@/components/Topics";

export default async function page({
  params,
}: {
  params: { classId: string };
}) {
  return <TopicsPage />;
}

// classId = ambil id cari class, buat topic section

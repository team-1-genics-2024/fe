import React from "react";
import Classes from "@/components/Classes";

export default async function page({
  params,
}: {
  params: { classId: string };
}) {
  return <Classes />;
}

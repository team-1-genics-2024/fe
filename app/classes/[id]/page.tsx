import React from "react";
import Classes from "@/app/classes/page";

export default async function page({}: { params: { classId: string } }) {
  return <Classes />;
}

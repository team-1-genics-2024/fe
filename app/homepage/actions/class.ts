"use server";
import { Class, ClassDataResponse } from "@/types/class";

export const fetchClassData = async (): Promise<Class[]> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) throw new Error("API base URL is not defined");

  const response = await fetch(`${apiBaseUrl}api/class`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);

  const jsonData: ClassDataResponse = await response.json();
  if (jsonData.resultCode !== 200) throw new Error(jsonData.resultMessage);

  return jsonData.data.classes;
};

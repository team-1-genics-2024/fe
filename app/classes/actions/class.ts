"use server";
import { Class, ClassDataResponse, ClassDetailResponse } from "@/types/class";

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) throw new Error("API base URL is not defined");
  return apiBaseUrl;
};

export const fetchClassData = async (): Promise<Class[]> => {
  const response = await fetch(`${getApiBaseUrl()}api/class`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error(`Error: ${response.status}`);

  const jsonData: ClassDataResponse = await response.json();
  if (jsonData.resultCode !== 200) throw new Error(jsonData.resultMessage);

  return jsonData.data.classes;
};

export const fetchClassById = async (id: number): Promise<Class> => {
  const response = await fetch(`${getApiBaseUrl()}api/class/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error(`Error: ${response.status}`);

  const jsonData: ClassDetailResponse = await response.json();
  if (jsonData.resultCode !== 200) throw new Error(jsonData.resultMessage);

  return jsonData.data.class;
};

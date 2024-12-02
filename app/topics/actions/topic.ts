"use server";
import { Topic, TopicDataResponse } from "@/types/topics";

export const fetchTopicsByClassId = async (
  classId: number
): Promise<Topic[]> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not defined");
  }

  const response = await fetch(`${apiBaseUrl}api/topic/${classId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const { resultCode, resultMessage, data }: TopicDataResponse =
    await response.json();

  if (resultCode !== 200) {
    throw new Error(`Error: ${resultMessage}`);
  }

  return data.subTopics;
};

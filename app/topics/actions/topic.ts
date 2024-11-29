"use server";
import { Topic, TopicDataResponse } from "@/types/topics";

export const fetchTopicsByClassId = async (
  classId: number
): Promise<Topic[]> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined");
    }

    const response = await fetch(`${apiBaseUrl}api/topic/${classId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonData: TopicDataResponse = await response.json();
    console.log(jsonData);

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    return jsonData.data.subTopics;
  } catch (error) {
    console.error(`Failed to fetch topics for class ID ${classId}:`, error);
    throw error;
  }
};

"use server";

interface Topic {
  name: string;
  description: string;
  topicId: number;
  subtopicId: number;
  imageUrl: string;
  videoUrl: string;
}

interface TopicResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    subTopics: Topic[];
  };
}

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

    const jsonData: TopicResponse = await response.json();

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    return jsonData.data.subTopics;
  } catch (error) {
    console.error(`Failed to fetch topics for class ID ${classId}:`, error);
    throw error;
  }
};

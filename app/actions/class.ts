"use server";
interface Class {
  id: number;
  name: string;
  imageUrl: string;
  totalTopics: number;
  totalSubtopics: number;
  rating: number;
  totalParticipants: number;
  updatedAt: string;
}

interface ClassDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    classes: Class[];
  };
}

export const fetchClassData = async (): Promise<Class[]> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined");
    }

    const response = await fetch(`${apiBaseUrl}api/class`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonData: ClassDataResponse = await response.json();

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    return jsonData.data.classes;
  } catch (error) {
    console.error("Failed to fetch class data:", error);
    throw error;
  }
};

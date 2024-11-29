import { Enroll, EnrollDataResponse } from "@/types/enroll";

export const fetchEnrollData = async ({
  searchEnroll,
}: {
  searchEnroll: string;
}): Promise<Enroll[]> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined");
    }

    const response = await fetch(
      `${apiBaseUrl}api/enroll/search?keyword=${searchEnroll}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonData: EnrollDataResponse = await response.json();

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    return jsonData.data.classes;
  } catch (error) {
    console.error("Failed to fetch class data:", error);
    throw error;
  }
};

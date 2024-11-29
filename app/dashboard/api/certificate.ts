import { CertificateDataResponse } from "@/types/certificate";

export const fetchCertificate = async (): Promise<CertificateDataResponse> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined");
    }

    const response = await fetch(`${apiBaseUrl}api/certificate`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (localStorage.getItem("accessToken") || ""),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonData = await response.json();

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    // console.log(jsonData);
    return jsonData as CertificateDataResponse;
  } catch (error) {
    console.error("Failed to fetch class data:", error);
    throw error;
  }
};
export const fetchCertificateDetail = async ({
  id,
}: {
  id: number;
}): Promise<CertificateDataResponse> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined");
    }

    const response = await fetch(`${apiBaseUrl}api/certificate/class/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (localStorage.getItem("accessToken") || ""),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonData = await response.json();

    if (jsonData.resultCode !== 200) {
      throw new Error(`Error: ${jsonData.resultMessage}`);
    }

    // console.log(jsonData);
    return jsonData as CertificateDataResponse;
  } catch (error) {
    console.error("Failed to fetch class data:", error);
    throw error;
  }
};

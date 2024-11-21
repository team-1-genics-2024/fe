export interface Certificate {
  id: string;
  userId: number;
  classId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  };
  class: {
    id: number;
    name: string;
  };
}
export interface EnrollDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    certificates: Certificate[];
  };
}

export const fetchCertificate = async (): Promise<EnrollDataResponse> => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error('API base URL is not defined');
    }

    const response = await fetch(`${apiBaseUrl}api/certificate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (localStorage.getItem('accessToken') || ''),
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
    return jsonData as EnrollDataResponse;
  } catch (error) {
    console.error('Failed to fetch class data:', error);
    throw error;
  }
};

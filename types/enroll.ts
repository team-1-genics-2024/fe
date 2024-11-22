export interface Enroll {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  totalUserProgress: number;
  totalSubtopics: number;
  linkButton: string;
}

export interface EnrollDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    classes: Enroll[];
  };
}

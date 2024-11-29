export interface Class {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  totalTopics: number;
  totalSubtopics: number;
  totalParticipants: number;
}

export interface ClassDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    classes: Class[];
  };
}

export interface ClassDetailResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    class: Class;
  };
}

export interface Topic {
  name: string;
  classId: number;
  SubTopic: SubTopics[];
}
// subtopic disini buat ambil id, name, image
export interface SubTopics {
  name: string;
  topicId: number;
  subtopicId: number;
  imageUrl: string;
}

export interface TopicResponse {
  resultCode: number;
  resultMessage: string;
  data: Topic[];
}

export interface TopicDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    subTopics: Topic[];
  };
}

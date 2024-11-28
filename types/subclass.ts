export interface SubClassData {
  name: string;
  description: string;
  videoUrl: string;
  subtopicId: number;
  topicId: number;
  classId: number;
}

export interface MembershipData {
  userId: number;
  remainingDays: number;
  currentDate: Date;
}

export type SubClassCardProps = {
  judul?: string;
  video?: string;
  textbook?: string;
  subtopicId: number;
  topicId?: number;
  classId: number;
};

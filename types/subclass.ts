export interface SubClassData {
  name: string;
  topicId: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
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
};

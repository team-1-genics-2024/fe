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

export interface CertificateDataResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    certificates: Certificate[];
  };
}

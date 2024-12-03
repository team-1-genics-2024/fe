export interface LoginResult {
  success: boolean;
  data?: {
    data?: {
      accessToken?: string;
    };
  };
  error?: ServerError | string;
}

export interface ServerError {
  errorCode: number;
  errorMessage: string;
}

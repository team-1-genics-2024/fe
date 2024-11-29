export interface LoginResult {
  success: boolean;
  data?: {
    data?: {
      accessToken?: string;
    };
  };
  error?: ServerError | string; // Update to accommodate the new error structure
}

export interface ServerError {
  errorCode: number;
  errorMessage: string;
}

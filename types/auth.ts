export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

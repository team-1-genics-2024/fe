import { RefreshTokenResponse } from "@/types/auth";

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const setAccessTokens = (accessToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
};

export const removeAccessTokens = (): void => {
  localStorage.removeItem("accessToken");
};

export const refreshUserToken =
  async (): Promise<RefreshTokenResponse | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const tokens: RefreshTokenResponse = data.data;
      setAccessTokens(tokens.accessToken);
      return tokens;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

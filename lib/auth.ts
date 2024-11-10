import { RefreshTokenResponse } from "@/types/auth";

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const setAccessTokens = (accessToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  console.log("Access Token saved to localStorage");
};

export const removeAccessTokens = (): void => {
  localStorage.removeItem("accessToken");
  console.log("Tokens removed from local storage");
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
      console.error("Token refresh error:", error);
      return null;
    }
  };

import { RefreshTokenResponse } from "@/types/auth";

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const setAccessTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  localStorage.setItem("accessToken", accessToken);
  console.log("Access Token saved to localStorage");
};

export const removeAccessTokens = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  console.log("Tokens removed from local storage");
};
const decodeJWT = (token: string): any => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
};

export const refreshUserToken =
  async (): Promise<RefreshTokenResponse | null> => {
    const refreshToken = getStoredRefreshTokenFromCookie();

    if (!refreshToken) return null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const tokens: RefreshTokenResponse = data.data; // Assuming tokens are inside `data.data`
      setAccessTokens(tokens.accessToken, tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.error("Token refresh error:", error);
      return null;
    }
  };

const getStoredRefreshTokenFromCookie = (): string | null => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/refreshToken=([^;]+)/);
    return match ? match[1] : null;
  }
  return null;
};

export const isAccessTokenExpired = (token: string): boolean => {
  const decodedToken = decodeJWT(token);
  if (!decodedToken) return true;
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decodedToken.exp < currentTime;
};

export const checkAndRefreshToken = async () => {
  const accessToken = getStoredToken();
  if (!accessToken) {
    console.log("No access token found.");
    return;
  }

  if (isAccessTokenExpired(accessToken)) {
    console.log("Access token expired, refreshing...");
    const refreshedTokens = await refreshUserToken();
    if (refreshedTokens) {
      console.log("Token refreshed successfully");
    } else {
      console.log("Failed to refresh token");
    }
  }
};

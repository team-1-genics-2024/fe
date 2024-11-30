"use client";
import { useState, useEffect } from "react";
import {
  getStoredToken,
  setAccessTokens,
  removeAccessTokens,
} from "@/lib/authentication/auth";
import { LoginFormData, AuthResponse } from "@/types/auth";
import { showToast } from "@/lib/custom-toast/toast";

export const cleanProtectedPage = (errorMessage?: string) => {
  showToast(errorMessage || "Session expired, please login again", "error");
  removeAccessTokens();
  localStorage.removeItem("avatarImage");
  return;
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getStoredToken();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    }
  }, []);

  const login = async (formData: LoginFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data: any = await response.json();

      if (response.ok && data.resultCode === 200) {
        const { accessToken } = data.data;

        setAccessTokens(accessToken);
        setIsAuthenticated(true);

        return { success: true, data };
      } else {
        showToast(data.errorMessage, "error");
        return { success: false, error: data.errorMessage || "" };
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("An unexpected error occurred", "error");
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    try {
      let token = getStoredToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        cleanUpAuth();
        window.location.reload();
        return;
      }

      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!refreshResponse.ok) {
        const refreshErrorData = await refreshResponse.json();
        cleanProtectedPage(
          refreshErrorData.message || "Failed to refresh token"
        );
        window.location.reload();
        return;
      }

      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      token = newAccessToken;

      const retryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!retryResponse.ok) {
        const retryErrorData = await retryResponse.json();
        cleanProtectedPage(retryErrorData.message || "Failed to logout");

        return;
      }

      cleanUpAuth();
    } catch (error) {
      console.error("Logout error:", error);
      showToast("An unexpected error occurred during logout", "error");
    }
  };

  const cleanUpAuth = (errorMessage?: string) => {
    removeAccessTokens();
    setIsAuthenticated(false);
    setAvatarImage(null);
    localStorage.removeItem("avatarImage");
    setTimeout(() => {
      showToast(
        errorMessage || "Successfully logged out",
        errorMessage ? "error" : "success"
      );
    }, 3000);
  };

  return {
    isAuthenticated,
    cleanProtectedPage,
    isLoading,
    login,
    logout,
  };
};

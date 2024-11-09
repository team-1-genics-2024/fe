"use client";
import { useState, useEffect } from "react";
import {
  getStoredToken,
  setAccessTokens,
  removeAccessTokens,
} from "@/lib/auth";
import { LoginFormData, AuthResponse } from "@/types/auth";
import { showToast } from "@/lib/toast";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = async (formData: LoginFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data: AuthResponse = await response.json();

      if (response.ok && data.resultCode === 200) {
        const { accessToken, refreshToken } = data.data;

        setAccessTokens(accessToken, refreshToken);
        setIsAuthenticated(true);
        showToast("Successfully logged in", "success");
        return { success: true, data };
      } else {
        showToast(data.resultMessage || "Login failed", "error");
        return { success: false, error: data.resultMessage || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("An unexpected error occurred", "error");
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = () => {
    removeAccessTokens();
    setIsAuthenticated(false);
    setAvatarImage(null);
    localStorage.removeItem("avatarImage");
    showToast("Successfully logged out", "success");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

"use client";
import { useState, useEffect } from "react";
import {
  getStoredToken,
  setAccessTokens,
  removeAccessTokens,
} from "@/lib/auth";
import { LoginFormData, AuthResponse } from "@/types/auth";
import { showToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const router = useRouter();

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
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data: AuthResponse = await response.json();

      if (response.ok && data.resultCode === 200) {
        const { accessToken } = data.data;

        setAccessTokens(accessToken);
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

  const getTokenFromCookies = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const logout = async () => {
    try {
      let token = getStoredToken();
      if (!token) {
        token = getTokenFromCookies();
      }

      if (!token) {
        console.error("No token found for logout");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        showToast("Failed to log out", "error");
        return;
      }

      removeAccessTokens();
      setIsAuthenticated(false);
      setAvatarImage(null);
      localStorage.removeItem("avatarImage");
      showToast("Successfully logged out", "success");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("An unexpected error occurred during logout", "error");
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

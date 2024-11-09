"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, refreshUserToken } from "@/lib/auth";
import { showToast } from "@/lib/toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const validateAuth = async () => {
      const token = getStoredToken();

      const fetchUserProfile = async (token: string) => {
        try {
          const response = await fetch(`${baseApiUrl}api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            return data.errorCode;
          }

          return data.resultCode;
        } catch (error) {
          return null;
        }
      };

      const code = await fetchUserProfile(token as string);

      if (!token || code != 200) {
        const refreshResult = await refreshUserToken();
        console.log("refreshResult", refreshResult);
        if (!refreshResult) {
          showToast("You may login first before accessing this page", "error");
          await router.push("/");
          return;
        }

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    validateAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

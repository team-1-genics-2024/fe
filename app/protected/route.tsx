"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, refreshUserToken } from "@/lib/auth";
import { showToast } from "@/lib/toast";
import { WithFullPageLoadingScreen } from "@/components/layout/loading/loading-screen";
import { removeAccessTokens } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    const validateAuth = async () => {
      setIsLoading(true);

      const token = getStoredToken();

      const fetchUserProfile = async (token: string) => {
        try {
          const response = await fetch(`${baseApiUrl}api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
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

      if (code != 200) {
        const refreshResult = await refreshUserToken();
        console.log("refreshResult", refreshResult);
        if (!refreshResult) {
          showToast("Session expired, please login again", "error");
          removeAccessTokens();
          setIsAuthenticated(false);
          setAvatarImage(null);
          localStorage.removeItem("avatarImage");
          await router.push("/");
          setIsLoading(false);
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

  if (isLoading) {
    return <WithFullPageLoadingScreen>{children}</WithFullPageLoadingScreen>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

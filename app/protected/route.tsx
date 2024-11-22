"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, refreshUserToken } from "@/lib/authentication/auth";

import { WithFullPageLoadingScreen } from "@/components/layout/loading/loading-screen";
import { cleanProtectedPage } from "@/components/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const fetchUserProfile = useCallback(
    async (token: string): Promise<number | null> => {
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
        return response.ok ? data.resultCode : data.errorCode;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [baseApiUrl]
  );

  useEffect(() => {
    const validateAuth = async () => {
      setIsLoading(true);
      const token = getStoredToken();
      const code = await fetchUserProfile(token as string);

      if (code !== 200) {
        const refreshResult = await refreshUserToken();
        if (!refreshResult) {
          cleanProtectedPage();
          setIsAuthenticated(false);
          setIsLoading(false);
          await router.push("/");
        }
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    validateAuth();
  }, [fetchUserProfile, router]);

  if (isLoading) {
    return <WithFullPageLoadingScreen>{children}</WithFullPageLoadingScreen>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

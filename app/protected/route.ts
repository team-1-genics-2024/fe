"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, refreshUserToken } from "@/lib/auth";
import { toast } from "react-toastify";
import { showToast } from "@/lib/toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      const token = getStoredToken();

      if (!token) {
        const refreshResult = await refreshUserToken();

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

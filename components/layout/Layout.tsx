"use client";

import * as React from "react";

import Navigation from "@/components/layout/modalAuth";
import Footer from "@/components/layout/footer";
import NavbarAuthenticated from "@/components/layout/navbar-authenticated";
import { useRouter } from "next/navigation";
interface LayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
  customClass?: string;
  withPadding?: boolean;
}

export default function Layout({
  children,
  withNavbar,
  withFooter,
  customClass = "",
  withPadding = true,
}: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchUserProfile = async (token: string) => {
      try {
        let response = await fetch(`${baseApiUrl}api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        console.log("Response:", response);

        if (response.ok) {
          const data = await response.json();
          console.log("User data:", data);
          setIsAuthenticated(true);
          return;
        }

        const refreshResponse = await fetch(`${baseApiUrl}api/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!refreshResponse.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          localStorage.removeItem("accessToken");

          router.replace("/");
        }

        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        response = await fetch(`${baseApiUrl}api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        setIsAuthenticated(true);
        console.log("User data:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserProfile(token as string);
  }, []);
  return (
    <div className={`min-h-screen flex flex-col ${customClass}`}>
      {withNavbar && !isAuthenticated && <Navigation />}
      {withNavbar && isAuthenticated && <NavbarAuthenticated />}

      <main className={`flex-grow ${withPadding ? "px-4 py-8" : ""}`}>
        {children}
      </main>

      {withFooter && <Footer />}
    </div>
  );
}

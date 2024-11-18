"use client";
import * as React from "react";
import Navigation from "@/components/layout/modalAuth";
import FooterSection from "@/components/layout/footer";
import NavbarAuthenticated from "@/components/layout/navbarAuthenticated";

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

        if (response.ok) {
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
          setIsAuthenticated(false);
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
          setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
      } catch (error) {
        return;
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

      {withFooter && <FooterSection />}
    </div>
  );
}

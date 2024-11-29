"use client";
import * as React from "react";
import Navigation from "@/components/layout/navbar/navbar-auth";
import FooterSection from "@/components/layout/footer/Footer";
import NavbarAuthenticated from "@/components/layout/navbar/navbar-authenticated";

interface LayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
}

export default function Layout({
  children,
  withNavbar,
  withFooter,
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
        console.log(error);
        return;
      }
    };
    fetchUserProfile(token as string);
  }, [baseApiUrl]);

  return (
    <>
      {withNavbar && !isAuthenticated && <Navigation />}
      {withNavbar && isAuthenticated && <NavbarAuthenticated />}

      {children}

      {withFooter && <FooterSection />}
    </>
  );
}

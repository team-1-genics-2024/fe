"use client";

import * as React from "react";

import Navigation from "@/components/layout/modalAuth";
import Footer from "@/components/layout/footer";
import NavbarClassPage from "@/components/layout/navbar-authenticated";

interface LayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
  withClassesNavbar?: boolean;
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

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <div className={`min-h-screen flex flex-col ${customClass}`}>
      {withNavbar && !isAuthenticated && <Navigation />}
      {withNavbar && isAuthenticated && <NavbarClassPage />}

      <main className={`flex-grow ${withPadding ? "px-4 py-8" : ""}`}>
        {children}
      </main>

      {withFooter && <Footer />}
    </div>
  );
}

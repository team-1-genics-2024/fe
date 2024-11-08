import * as React from "react";
import Navigation from "@/components/layout/modalAuth";
import Footer from "@/components/layout/footer";
import NavbarClassesPage from "@/components/layout/navbarClassesPage";

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
  withClassesNavbar,
  customClass = "",
  withPadding = true,
}: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${customClass}`}>
      {withNavbar && <Navigation />}
      {withClassesNavbar && <NavbarClassesPage />}

      <main className={`flex-grow ${withPadding ? "px-4 py-8" : ""}`}>
        {children}
      </main>

      {withFooter && <Footer />}
    </div>
  );
}

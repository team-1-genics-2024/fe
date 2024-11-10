"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, LayoutGrid, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { userAvatars } from "@/lib/data";
import { useAuth } from "../hooks/useAuth";
import { WithFullPageLoadingScreen } from "@/components/layout/loading-screen";

export default function NavbarHomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    console.log("masuk sini");
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!fetchUserProfile(token || ""));
    const storedAvatar = localStorage.getItem("avatarImage");
    if (storedAvatar) {
      setAvatarImage(storedAvatar);
    } else {
      const randomIndex = Math.floor(Math.random() * userAvatars.length);
      const selectedAvatar = userAvatars[randomIndex];
      setAvatarImage(selectedAvatar);
      localStorage.setItem("avatarImage", selectedAvatar);
    }
  }, []);

  // --USERNAME AND EMAIL USER--  //  -- PAKE METHODE KEK GINI KLO MAU FETCH USER DI PAGE YG GA DILINDUNGI/GA DIDALEM PROTECTED ROUTE!--
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
        setUserName(data.data.name);
        setUserEmail(data.data.email);
        console.log("User data:", data);
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
      setUserName(data.data.name);
      setUserEmail(data.data.email);
      console.log("User data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // --HANDLE LOGOUT--
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      return;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center gap-8">
          <div className="flex flex-row items-center">
            <Image
              src="/image/homepage/icon.png"
              alt="Left Star"
              width={20}
              height={20}
            />
            <span className="text-xl ml-2 font-bold text-[#3498DB]">
              SinauPo'o
            </span>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-12">
              <Link
                href="/home"
                className="font-medium text-sm text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="font-medium text-sm text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="font-medium text-sm text-gray-600 hover:text-gray-900"
              >
                About us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isAuthenticated && (
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900"
                    aria-label="Apps"
                  >
                    <LayoutGrid className="w-5 h-5 block sm:hidden" />
                  </button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 md:hidden">
                <DropdownMenuItem asChild>
                  <Link
                    href="/home"
                    className="flex items-center w-full cursor-pointer"
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center w-full cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/about"
                    className="flex items-center w-full cursor-pointer"
                  >
                    About us
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && avatarImage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all">
                    <AvatarImage src={avatarImage} alt="User Avatar" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <WithFullPageLoadingScreen>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-2">
                      <p className="font-medium">{userName}</p>
                      <p className="text-sm text-gray-500">{userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </WithFullPageLoadingScreen>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

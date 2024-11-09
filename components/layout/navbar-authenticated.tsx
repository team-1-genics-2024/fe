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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { userAvatars } from "@/lib/data";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "@/app/protected/route";
import { getStoredToken } from "@/lib/auth";

export default function NavbarHomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    if (token) {
      const storedAvatar = localStorage.getItem("avatarImage");
      if (storedAvatar) {
        setAvatarImage(storedAvatar);
      } else {
        const randomIndex = Math.floor(Math.random() * userAvatars.length);
        const selectedAvatar = userAvatars[randomIndex];
        setAvatarImage(selectedAvatar);
        localStorage.setItem("avatarImage", selectedAvatar); // Store in localStorage
      }
      fetchUserProfile(token);
    }
  }, []);

  // --USERNAME AND EMAIL USER
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${baseApiUrl}api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      showToast("Successfully logged out", "success");
      router.replace("/");

      console.log("After logout, avatarImage:", avatarImage);
    } catch (error) {
      showToast("Error signing out", "error");
    }
  };

  // --DEBUG GET USER--
  const debugGetUser = async () => {
    const accessToken = getStoredToken();

    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    try {
      const response = await fetch(`${baseApiUrl}api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      console.log("User data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <ProtectedRoute>
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
              <span
                className="text-xl ml-2 font-bold text-[#3498DB]"
                onClick={debugGetUser} //buat debug
              >
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
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

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
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>
    </ProtectedRoute>
  );
}

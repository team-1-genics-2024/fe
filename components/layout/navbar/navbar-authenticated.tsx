"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { userAvatars } from "@/lib/static-data/avatar-data";
import { useAuth } from "../../hooks/useAuth";
import NavbarSkeleton from "./skeleton/navbar-skeleton";

export default function NavbarAuthenticated() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!fetchUserProfile(token || ""));
    const storedAvatar = localStorage.getItem("avatarImage");
    if (storedAvatar) {
      setAvatarImage(storedAvatar);
    } else {
      setIsLoading(false);
      const randomIndex = Math.floor(Math.random() * userAvatars.length);
      const selectedAvatar = userAvatars[randomIndex];
      setAvatarImage(selectedAvatar);
      localStorage.setItem("avatarImage", selectedAvatar);
    }
  }, []);

  // --USERNAME AND EMAIL USER--  //  -- PAKE METHODE KEK GINI KLO MAU FETCH USER DI PAGE YG GA DILINDUNGI/GA DIDALEM PROTECTED ROUTE!--
  const fetchUserProfile = async (token: string) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
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
        setIsLoading(false);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  // --HANDLE LOGOUT--
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <section className="w-full max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center gap-8">
          <Link href="/" className="flex flex-row items-center z-50">
            <Image
              src="/image/logo/logo.png"
              alt="Left Star"
              width={150}
              height={150}
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-12">
              <Link
                href="/"
                className="font-medium text-md text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="font-medium text-md text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="font-medium text-md text-gray-600 hover:text-gray-900"
              >
                About us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isAuthenticated && (
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900"
                    aria-label="Apps"
                  >
                    <LayoutGrid className="w-6 h-6 block sm:hidden" />
                  </button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 md:hidden">
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
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
                  <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-[#3498db] transition-all">
                    <AvatarImage src={avatarImage} alt="User Avatar" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-72 p-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-102 bg-white"
                >
                  <div className="relative group">
                    <Avatar className="h-16 w-16 transform transition-all duration-500 hover:scale-110 border-4 border-[#3498db] shadow-xl group-hover:shadow-2xl relative z-10 ">
                      <AvatarImage
                        src={avatarImage}
                        alt="User Avatar"
                        className="object-cover transition-transform duration-700 hover:rotate-6"
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xl">
                        {userName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 transform scale-100 group-hover:scale-150 transition-all duration-700" />

                    <div className="mt-4 space-y-1">
                      <p className="font-semibold text-lg text-gray-900">
                        {userName}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <DropdownMenuSeparator className="bg-gray-300" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-50 group mt-3 h-2"
                    >
                      <LogOut className="w-5 h-5 mr-3 text-gray-700 group-hover:text-gray-700 transition-colors duration-200" />
                      <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                        Logout
                      </span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
}

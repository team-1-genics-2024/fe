import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, LayoutGrid } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function NavbarHomePage() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center gap-8">
          <Link href="/" className="flex flex-row items-center">
            <Image
              src="/image/homepage/icon.png"
              alt="Left Star"
              width={20}
              height={20}
            />
            <span className="text-xl ml-2 font-semibold text-[#3498DB]">
              SinauPo'o
            </span>
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-12">
              <Link
                href="/"
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

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Apps"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar/avatar1.png" alt="Profile" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}

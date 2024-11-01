import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect, useState } from "react";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link
            href="#"
            className="flex flex-row items-center"
            prefetch={false}
          >
            <Image
              src="/image/homepage/icon.png"
              alt="Left Star"
              width={20}
              height={20}
            />
            <span className="text-lg font-semibold ml-2 text-[#3498DB]">
              Sinaupo'o
            </span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About Us
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Search
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <Button
                variant="outline"
                className="rounded-full text-blue-500"
                size="sm"
              >
                Sign in
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button size="sm" className="bg-blue-500 rounded-full">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
function setIsLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}

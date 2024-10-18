"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStatus as useFormStatus } from "react-dom";

export default function Login() {
  const { pending } = useFormStatus();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md lg:max-w-4xl lg:flex lg:items-center lg:justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative">
        <button className="absolute top-4 right-4 lg:right-12 lg:top-8 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* layar device besar */}
        <div className="hidden lg:block lg:w-1/2 text-white p-6">
          <CardHeader className="space-y-1 mb-40">
            <CardTitle className="text-3xl font-bold text-black ">
              Log in
            </CardTitle>
            <p className="text-sm text-black dark:text-gray-400 ">
              to continue learning
            </p>
          </CardHeader>
        </div>

        {/* layar device kecil */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="space-y-1 mb-0 lg:hidden">
            <CardTitle className="text-2xl font-bold text-start">
              Log in
            </CardTitle>
            <p className="text-sm text-black dark:text-gray-400 text-start">
              to continue learning
            </p>
          </CardHeader>
          <CardContent className="space-y-2 lg:mt-14">
            <div className="space-y-2">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-6 border rounded-lg border-gray-400 focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-3 py-6 border rounded-lg border-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              className="w-full bg-blue-500 rounded-lg hover:bg-blue-600 text-white py-2 transition-colors"
              disabled={pending}
              type="submit"
            >
              {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <>Log in</>
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border border-gray-400 text-blue-500 dark:border-gray-700 rounded-lg p-2 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600"
            >
              <Image src="/Google.png" width={20} height={20} alt="google" />
              <span>Log in with google</span>
            </Button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have account yet?{" "}
              <Link href="/SignUp" target='_blank' className="text-blue-400 underline font-bold">
                Sign up
              </Link>
              <span className="text-gray-500"> first!</span>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}


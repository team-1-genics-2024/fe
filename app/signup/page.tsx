"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation"; 

export default function Page() {
  const router = useRouter(); 
  const { pending } = useFormStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const existingEmails = ["test@example.com", "user@example.com"];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (existingEmails.includes(email)) {
      setError(
        "You already have an account with that email address. Try to log in instead."
      );
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7c7c7c]">
      <div className="w-full max-w-md lg:max-w-4xl lg:p-3 lg:h-[440px] lg:flex lg:items-center lg:justify-between p-0 bg-white rounded-xl shadow-lg relative lg:space-y-10">
        <button
          className="absolute top-6 lg:top-10 right-6 lg:right-8 text-black"
          onClick={() => router.push("/")} // back to the home
        >
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

        {/* Large screen */}
        <div className="hidden lg:block lg:w-1/2 text-white p-6 w-[862px] h-[392px] py-6">
          <CardHeader className="space-y-2">
            <CardTitle className="text-[32px] font-medium text-black font-['Poppins'] leading-10">
              Sign up
            </CardTitle>
            <p className="text-black text-base font-medium font-['Lato'] leading-normal tracking-tight">
              to continue learning
            </p>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert
                  variant="destructive"
                  className="text-xs bg-[#ffdad7] text-[#c5524c] rounded-xl inline-flex gap-4 p-4 h-auto items-center mt-2"
                >
                  <AlertDescription className="self-stretch text-[#c5524c] text-sm font-normal font-['Lato'] leading-[1.5] tracking-wide">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardHeader>
        </div>

        {/* Small screen */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="space-y-1 lg:hidden">
            <CardTitle className="text-[32px] font-medium font-['Poppins'] leading-10 text-start">
              Sign up
            </CardTitle>
            <p className="text-sm text-black dark:text-gray-400 text-start">
              to continue learning
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              {error && (
                <Alert
                  variant="destructive"
                  className="lg:hidden mb-4 bg-[#ffdad7] text-[#c5524c] rounded-xl inline-flex gap-4 p-4 h-auto items-center"
                >
                  <AlertDescription className="self-stretch text-[#c5524c] text-xs font-normal font-['Lato'] leading-[1.5] tracking-wide">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-2.5">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal font-['Lato'] leading-normal tracking-wide"
                />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-fullh-14  px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal font-['Lato'] leading-normal tracking-wide"
                />
              </div>

              <Button
                className=" text-sm h-10 w-full bg-[#3498db] rounded-[100px] hover:bg-[#3498DB] text-white transition-colors font-medium font-['Lato'] leading-tight tracking-tight"
                disabled={pending}
                type="submit"
              >
                {pending ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white text-[#3498db]"></div>
                ) : (
                  <>Sign up</>
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs font-medium">
                <span className="bg-white dark:bg-gray-800 px-2 text-[#747a7e] dark:text-gray-400 font-['Lato']">
                  or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-10 border rounded-[100px] border-[#747a7e] text-[#3498db] text-sm font-medium font-['Lato'] leading-tight tracking-tight dark:border-gray-700 p-2 flex items-center justify-center space-x-1 pl-4 pr-6 py-2.5"
            >
              <Image
                src="/Google.png"
                width={20}
                height={20}
                alt="google"
                className="p-[0.94px] w-[18px] h-[18px]"
              />
              <span>Sign up with google</span>
            </Button>

            <p className="text-[#747a7e] text-center text-[11px] font-medium font-['Lato'] leading-none tracking-wide">
              Already have account?{" "}
              <Link
                href="/login"
                className="text-[#3498db] text-[11px] font-bold font-['Lato'] underline leading-none tracking-wide"
              >
                Log in
              </Link>
              <span className="text-[#747a7e]"> instead!</span>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
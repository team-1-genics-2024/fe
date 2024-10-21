'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { loginAction, LoginResponse } from "../../app/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      className="text-sm h-10 w-full bg-[#3498db] rounded-[100px] hover:bg-[#3498DB] text-white transition-colors font-medium font-['Lato'] leading-tight tracking-tight"
      disabled={pending}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        "Log in"
      )}
    </Button>
  );
}

const initialState: LoginResponse = {
  success: false,
  error: "",
};

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast("Email and password are required");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      await formAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (state.success) {
      showToast("You're successfully logged in!", 'success');
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } else if (state.error) {
      showToast(state.error);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md lg:max-w-4xl lg:p-2 lg:h-[470px] lg:flex lg:items-center lg:justify-between p-0 bg-white rounded-xl custom-shadow relative lg:space-y-10">
        <button
          type="button"
          className="absolute top-6 lg:top-10 right-6 lg:right-8 text-black"
          onClick={() => router.push("/")}
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
        <div className="hidden lg:block lg:w-1/2 text-white p-6 w-[862px] h-[392px] py-0">
          <Image
            src="/image/Star 5.png"
            alt="star"
            width={90}
            height={90}
            className="absolute bottom-[34%] left-[24%] hidden lg:block"
          />
          <Image
            src="/image/Star 5.png"
            priority
            alt="star"
            width={180}
            height={180}
            className="absolute bottom-[1%] left-[8%] hidden lg:block -rotate-45"
          />
          <CardHeader className="space-y-2">
            <CardTitle className="text-[32px] font-medium text-black leading-10">
              Log in
            </CardTitle>
            <p className="text-black text-base font-medium leading-normal tracking-tight">
              to continue learning
            </p>
          </CardHeader>
        </div>

        {/* Small screen */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="space-y-1 lg:hidden">
            <CardTitle className="text-[32px] font-medium leading-10 text-start">
              Log in
            </CardTitle>
            <p className="text-sm text-black dark:text-gray-400 text-start">
              to continue learning
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={formAction} className="space-y-2">
              <Input
                type="email"
                name="email"
                value={email}
                required
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide"
              />
              <div className="space-y-2.5 lg:mt-relative">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#747a7e] hover:text-[#3498db]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <SubmitButton />
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs font-medium">
                <span className="bg-white dark:bg-gray-800 px-2 text-[#747a7e] dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-10 border rounded-[100px] border-[#747a7e] text-[#3498db] text-sm font-medium leading-tight tracking-tight dark:border-gray-700 p-2 flex items-center justify-center space-x-1 pl-4 pr-6 py-2.5"
              >
                <Image
                  src="/Google.png"
                  width={20}
                  height={20}
                  alt="google"
                  className="p-[0.94px] w-[18px] h-[18px]"
                />
                <span>Log in with google</span>
              </Button>

              <p className="text-[#747a7e] text-center text-[11px] font-medium leading-none tracking-wide">
                Don't have account yet?{" "}
                <Link
                  href="/signup"
                  className="text-[#3498db] text-[11px] font-bold underline leading-none tracking-wide"
                >
                  Sign up
                </Link>
                <span className="text-[#747a7e]"> first!</span>
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
"use client";
import Image from "next/image";
import { LearningPathSection } from "./ClassGeneral";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { Suspense, useEffect, useState } from "react";
import LoadingUnprotectedRoute from "@/components/layout/loading/loading-unprotected-route";

import { z } from "zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { signUpSchema, SignUpFormData } from "@/lib/validation/authSchemas";
import SubmitButtonSignUp from "@/components/layout/button/button-signup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/custom-toast/toast";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const googleLogin = "https://api.beteam1genics.my.id/api/auth/google";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);
  const [isPending] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  const handleAboutUs = () => {
    router.push("/about");
  };

  const handleChoosePackage = () => {
    router.push("/payment");
  };

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await fetch(`${baseApiUrl}api/enroll`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setIsEnrolled(data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    checkEnrollment();
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingSignUp(true);

    try {
      const formData = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as unknown;
      const signUpData = await signUpSchema.parseAsync(
        formData as SignUpFormData
      );

      const response = await fetch(`${baseApiUrl}api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage =
          data.message || "Registration completed successfully";

        showToast(successMessage, "success");

        console.log(data);
      } else {
        const errorData = await response.json();
        console.error("Registration error response:", errorData);
        const errorMessage =
          errorData.errorMessage || "Please double check your credentials";

        showToast(errorMessage, "error");
      }
    } catch (error) {
      let errorMessage: string;
      console.error("Caught error during registration:", error);

      if (error instanceof z.ZodError) {
        errorMessage = error.errors.map((err) => err.message).join(", ");
      } else {
        errorMessage =
          error instanceof Error
            ? error.message
            : "Unexpected error occurred during registration";
      }

      showToast(errorMessage, "error");
    } finally {
      setIsSubmittingSignUp(false);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${baseApiUrl}api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Layout withNavbar withFooter>
      <div>
        <div className="relative h-screen bg-white flex items-center justify-center text-center overflow-hidden">
          <div className="absolute -right-[20px] top-[3%] hidden lg:block">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Left Star"
              width={120}
              height={120}
            />
          </div>

          <div className="absolute left-[-20px] top-[70%] hidden lg:block">
            <Image
              src="/image/homepage/leftstar.png"
              alt="Right Star"
              width={190}
              height={190}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-start w-full left-[-10px] top-[5%]">
              <Image
                src="/image/homepage/upperrightstar.png"
                alt="Upper Left Star"
                width={100}
                height={100}
              />
            </div>

            <div className="text-center mt-28 w-full h-[40vh] overflow-hidden z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 w-full md:w-[690px]">
                Ayo raih prestasi gemilang bersama!
              </h1>
              <div className="space-x-4">
                <Dialog
                  open={signupDialogOpen}
                  onOpenChange={setSignupDialogOpen}
                >
                  <div className="flex justify-between w-full max-w-md mx-auto mb-6">
                    {isEnrolled && (
                      <>
                        {" "}
                        {isLoggedIn ? (
                          <DialogTrigger asChild>
                            <button className="bg-[#3498DB] text-white px-4 py-2 rounded-full w-full mr-2">
                              Learn More
                            </button>
                          </DialogTrigger>
                        ) : (
                          <DialogTrigger asChild>
                            <button className="bg-[#3498DB] text-white px-4 py-2 rounded-full w-full mr-2">
                              Join Now
                            </button>
                          </DialogTrigger>
                        )}
                        <button
                          onClick={handlePaymentClick}
                          className="border border-[#3498DB] text-[#3498DB] px-4 py-2 rounded-full w-full ml-2"
                        >
                          Explore Pricing
                        </button>
                      </>
                    )}

                    <VisuallyHidden>
                      <DialogTitle>Hey</DialogTitle>
                    </VisuallyHidden>

                    <DialogContent className="bg-transparent outline-none border-none sm:max-w-[800px] p-0">
                      {isLoggedIn ? (
                        <div className="w-full max-w-md lg:max-w-4xl p-2 min-h-[40vh] bg-white rounded-xl custom-shadow flex items-center justify-center">
                          <div className="text-center w-full">
                            <div className="flex flex-col">
                              <h2
                                className="flex mt-8 flex-wrap justify-center 
            text-3xl sm:text-3xl lg:text-[28px] 
            font-semibold text-gray-700 
            leading-tight space-x-2"
                              >
                                <span>Thanks for choosing</span>
                                <div className="flex">
                                  <Image
                                    src="/image/logo/logo.png"
                                    alt="Sinaupo'o Logo"
                                    width={170}
                                    height={170}
                                    className="mr-2"
                                  />
                                </div>
                              </h2>
                            </div>

                            <p className="text-black whitespace-pre-line text-md sm:text-base font-medium leading-normal tracking-tight mt-12 p-4">
                              Looks like you haven’t picked a package yet.
                              Embark on your learning adventure now. Select a
                              package and let’s grow together!
                            </p>
                            <div className="flex justify-center mt-12 gap-2 cursor-pointer mb-8">
                              <Button
                                className="bg-[#3498DB] text-white px-6 py-2 rounded-full hover:bg-gray-100/50 hover:text-gray-200 transition-colors duration-300 mr-2 outline"
                                onClick={handleChoosePackage}
                              >
                                Choose Package
                              </Button>
                              <Button
                                className="rounded-full text-[#3498db] hover:text-gray-200 hover:bg-gray-100/50 bg-white outline"
                                onClick={handleAboutUs}
                              >
                                User Testimonials
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full max-w-md lg:max-w-4xl lg:p-4 lg:h-[470px] lg:flex lg:items-center lg:justify-between p-0 bg-white rounded-xl custom-shadow relative md:leading-[10vh] lg:leading-[5vh] md:py-16 lg:space-y-10">
                          <div className="hidden lg:block left-[4%]">
                            <Image
                              src="/star-5.svg"
                              alt="star"
                              width={90}
                              height={90}
                              className="absolute bottom-[34%] left-[24%]"
                            />
                            <Image
                              src="/star-5.svg"
                              priority
                              alt="star"
                              width={180}
                              height={180}
                              className="absolute bottom-[0.5%] left-[4%] -rotate-45"
                            />

                            <div className="lg:h-[60vh] xl:h-[40vh] flex items-start left-[20%]">
                              <CardHeader className="space-y-2 text-left">
                                <CardTitle className="text-[32px] font-medium text-black leading-10">
                                  Sign up
                                </CardTitle>
                                <p className="text-black text-base font-medium leading-normal tracking-tight">
                                  to continue learning
                                </p>
                              </CardHeader>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2 lg:pl-2">
                            <CardHeader className="space-y-2 lg:hidden sm:block">
                              <CardTitle className="text-[32px] font-medium text-black leading-10">
                                Sign up
                              </CardTitle>
                              <p className="text-black text-base font-medium leading-normal tracking-tight">
                                to continue learning
                              </p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <form
                                onSubmit={handleSignUp}
                                className="space-y-2"
                              >
                                <Input
                                  type="text"
                                  name="name"
                                  value={name}
                                  required
                                  disabled={isSubmittingSignUp}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Enter your name"
                                  className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide"
                                />
                                <Input
                                  type="email"
                                  name="email"
                                  value={email}
                                  required
                                  disabled={isSubmittingSignUp}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter your email"
                                  className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide"
                                />

                                <div className="relative">
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    disabled={isSubmittingSignUp}
                                    className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide pr-10"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#747a7e] hover:text-[#3498db]"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {!showPassword ? (
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
                                <SubmitButtonSignUp
                                  isSubmitting={isSubmittingSignUp}
                                />
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

                              <div className="space-y-2 sm:bottom-[20%]">
                                <Link href={googleLogin}>
                                  <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full h-10 border rounded-[100px] border-[#747a7e] text-[#3498db] text-sm font-medium leading-tight tracking-tight dark:border-gray-700 p-2 flex items-center justify-center space-x-1 pl-4 pr-6 py-2.5"
                                  >
                                    <Image
                                      src="/image/Google.png"
                                      width={20}
                                      height={20}
                                      alt="google"
                                      className="p-[0.94px] w-[18px] h-[18px]"
                                    />
                                    <span>
                                      {isPending
                                        ? "Redirecting..."
                                        : "Sign up with Google"}
                                    </span>
                                  </Button>
                                </Link>

                                <p className="text-[#747a7e]  text-center text-[11px] font-medium leading-none tracking-wide">
                                  Unlock Your Potential, Start Learning Today!
                                </p>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
            </div>

            <div className="flex justify-end mb-28 w-full px-8">
              <Image
                src="/image/homepage/lowerrightstar.png"
                alt="Upper Right Star"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingUnprotectedRoute />}>
          <LearningPathSection />
        </Suspense>
      </div>
    </Layout>
  );
}

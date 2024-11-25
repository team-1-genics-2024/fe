"use client";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { Suspense, useEffect, useState } from "react";
import { fetchClassData } from "./actions/class";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ErrorNoClassFound from "@/components/layout/error/error-no-class-found.tsx";
import LoadingUnprotectedRoute from "@/components/layout/loading/loading-unprotected-route";
import { Class } from "@/types/class";
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

const LearningPathSection = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedClasses = await fetchClassData();
        setClasses(fetchedClasses);
      } catch (err) {
        setError("Failed to load classes. Please try again later.");
        console.error("Error loading classes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleClassDetailClick = (id: number) => {
    router.push(`/classes/${id}`);
  };

  if (isLoading) {
    return <LoadingUnprotectedRoute />;
  }

  if (error) {
    return <ErrorNoClassFound />;
  }

  return (
    <div>
      <h1 className="font-semibold text-4xl text-gray-800 text-center mb-16 mt-24">
        Daftar Learning Path Rancangan Experts
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            onClick={() => handleClassDetailClick(classItem.id)}
            className="cursor-pointer"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: [-1, 1, -1, 1, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 0.5,
                },
              },
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <CardHomepage
              src={`/${classItem.imageUrl}`}
              title={classItem.name}
              date={`${classItem.totalTopics} Topics - ${classItem.totalSubtopics} Subtopics`}
              participants={classItem.totalParticipants.toString()}
              rating={classItem.rating.toString()}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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

  const handlePaymentClick = () => {
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

  return (
    <Layout withNavbar withFooter>
      <div>
        <div className="relative h-screen bg-white flex items-center justify-center text-center">
          <div className="absolute -right-[20px] top-[3%] hidden lg:block">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Left Star"
              width={120}
              height={120}
            />
          </div>

          <div className="absolute left-[-20px] hidden lg:block">
            <Image
              src="/image/homepage/leftstar.png"
              alt="Right Star"
              width={190}
              height={190}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-start w-full left-[-10px]">
              <Image
                src="/image/homepage/upperrightstar.png"
                alt="Upper Left Star"
                width={100}
                height={100}
              />
            </div>

            <div className="text-center mt-2 w-full h-[40vh] overflow-hidden z-10">
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
                        <DialogTrigger asChild>
                          <button className="bg-[#3498DB] text-white px-4 py-2 rounded-full w-full mr-2">
                            Gabung sekarang
                          </button>
                        </DialogTrigger>
                        <button
                          onClick={handlePaymentClick}
                          className="border border-[#3498DB] text-[#3498DB] px-4 py-2 rounded-full w-full ml-2"
                        >
                          Lihat harga
                        </button>
                      </>
                    )}

                    <VisuallyHidden>
                      <DialogTitle>Hey</DialogTitle>
                    </VisuallyHidden>

                    <DialogContent className="bg-transparent outline-none border-none sm:max-w-[800px] p-0">
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
                            <form onSubmit={handleSignUp} className="space-y-2">
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
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Enter your password"
                                  disabled={isSubmittingSignUp}
                                  className="w-full h-14 px-3 py-6 border rounded-2xl border-[#747a7e] text-[#454b4f] text-base font-normal leading-normal tracking-wide pr-10"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#747a7e] hover:text-[#3498db]"
                                  onClick={() => setShowPassword(!showPassword)}
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
                                Unlock Your Potential, Shape Your Future – Start
                                Learning Today!
                              </p>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
            </div>

            <div className="flex justify-end top-[30%] w-full px-8">
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

{
  /*  */
}

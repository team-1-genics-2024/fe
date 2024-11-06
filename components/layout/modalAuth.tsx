"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { signIn } from "next-auth/react";

// -- LOGIN VALIDATION --
const loginSchema = z.object({
  email: z.string().min(5, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/\d/, "Password must contain at least one number"),
});
type LoginFormData = z.infer<typeof loginSchema>;

// -- SIGN UP VALIDATION --
const signUpSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one number"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// -- CUSTOM SUBMIT BUTTON --
function SubmitButtonLogin({
  isSubmittingLogin,
}: {
  isSubmittingLogin: boolean;
}) {
  return (
    <Button
      className="text-sm h-10 w-full bg-[#3498db] rounded-[100px] hover:bg-[#3498DB] text-white transition-colors font-medium font-['Lato'] leading-tight tracking-tight disabled:opacity-70"
      disabled={isSubmittingLogin}
      type="submit"
      aria-disabled={isSubmittingLogin}
    >
      {isSubmittingLogin ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        "Log in"
      )}
    </Button>
  );
}
function SubmitButtonSignUp({
  isSubmittingSignUp,
}: {
  isSubmittingSignUp: boolean;
}) {
  return (
    <Button
      className="text-sm h-10 w-full bg-[#3498db] rounded-[100px] hover:bg-[#3498DB] text-white transition-colors font-medium font-['Lato'] leading-tight tracking-tight disabled:opacity-70"
      disabled={isSubmittingSignUp}
      type="submit"
      aria-disabled={isSubmittingSignUp}
    >
      {isSubmittingSignUp ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        "Sign Up"
      )}
    </Button>
  );
}

export default function Navigation() {
  const searchParams = useSearchParams();
  const googleLogin = "https://api.beteam1genics.my.id/api/auth/google";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [state, setState] = useState({ success: false, error: "" });
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const showToast = (message: string, type: "error" | "success" = "error") => {
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

  const switchToSignup = () => {
    setLoginDialogOpen(false);
    setTimeout(() => {
      setSignupDialogOpen(true);
    }, 300);
  };

  const switchToLogin = () => {
    setSignupDialogOpen(false);
    setTimeout(() => {
      setLoginDialogOpen(true);
    }, 300);
  };

  useEffect(() => {
    if (authenticated) {
      const next = searchParams.get("next") || "/dashboard";
      router.push(next);
      setLoginDialogOpen(false);
    }
  }, [authenticated, searchParams, router]);

  // -- HANDLE LOGIN --
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLogin(true);
    setError("");

    try {
      const formData: LoginFormData = {
        email,
        password,
      };

      const validatedData = loginSchema.parse(formData);

      const result = await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        showToast(result.error, "error");
      } else {
        showToast("Successfully logged in", "success");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setError(errorMessage);
        showToast(errorMessage, "error");
      } else {
        console.error("Login error:", error);
        setError("An unexpected error occurred. Please try again.");
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // -- HANDLE SIGN UP
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

      console.log(response);

      if (response.ok) {
        setState({ success: true, error: "" });
        toast.success("Successfully signed up");
        switchToLogin();
      } else {
        const errorData = await response.json();
        setState({
          success: false,
          error: errorData.message || "Registration failed",
        });
        showToast(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setState({
        success: false,
        error: "An unexpected error occurred. Please try again.",
      });
      showToast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmittingSignUp(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex flex-row items-center">
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
              href="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/search"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Search
            </Link>
          </nav>

          <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
            <div className="flex items-center gap-4">
              <DialogTrigger asChild>
                <Link href={"/"}>
                  <Button
                    variant="outline"
                    className="rounded-full text-[#3498db] hover:text-[#3498db] hover:bg-white"
                    size="sm"
                  >
                    Log in
                  </Button>
                </Link>
              </DialogTrigger>
              <VisuallyHidden>
                <DialogTitle>Hey</DialogTitle>
                <Description></Description>
              </VisuallyHidden>
              <DialogContent className="bg-transparent outline-none border-none sm:max-w-[800px] p-0">
                <div className="w-full max-w-md lg:max-w-4xl lg:p-4 lg:h-[400px] xl:h-[450px] lg:flex lg:items-center lg:justify-between  p-0 bg-white rounded-xl custom-shadow relative md:leading-[5vh] md:py-16">
                  <div className="hidden lg:block left-[4%]">
                    <Image
                      src="/image/Star 5.png"
                      alt="star"
                      width={90}
                      height={90}
                      className="absolute bottom-[34%] left-[24%]"
                    />
                    <Image
                      src="/image/Star 5.png"
                      priority
                      alt="star"
                      width={180}
                      height={180}
                      className="absolute bottom-[0.5%] left-[4%] -rotate-45"
                    />

                    <div className="h-[40vh] flex items-start left-[20%]">
                      <CardHeader className="space-y-2 text-left">
                        <CardTitle className="text-[32px] font-medium text-black leading-10">
                          Log in
                        </CardTitle>
                        <p className="text-black text-base font-medium leading-normal tracking-tight">
                          to continue learning
                        </p>
                      </CardHeader>
                    </div>
                  </div>

                  {/* small screen */}
                  <div className="w-full lg:w-1/2 lg:pl-2 sm:h-[40vh]">
                    <CardHeader className="space-y-2 lg:hidden sm:block">
                      <CardTitle className="text-[32px] font-medium text-black leading-10">
                        Log in
                      </CardTitle>
                      <p className="text-black text-base font-medium leading-normal tracking-tight">
                        to continue learning
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4 xl:mt-4">
                      <form onSubmit={handleLogin} className="space-y-2">
                        <Input
                          type="email"
                          name="email"
                          value={email}
                          required
                          disabled={isSubmittingLogin}
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
                            disabled={isSubmittingLogin}
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
                        <SubmitButtonLogin
                          isSubmittingLogin={isSubmittingLogin}
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
                              {isPending ? "Loading..." : "Login with Google"}
                            </span>
                          </Button>
                        </Link>
                        <p className="text-[#747a7e]  text-center text-[11px] font-medium leading-none tracking-wide">
                          Don't have account yet?{" "}
                          <span
                            onClick={switchToSignup}
                            className="text-[#3498db] text-[11px] cursor-pointer font-bold underline leading-none tracking-wide"
                          >
                            Sign up
                          </span>
                          <span className="text-[#747a7e]"> first!</span>
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </DialogContent>
              <Dialog
                open={signupDialogOpen}
                onOpenChange={setSignupDialogOpen}
              >
                <div className="flex items-center gap-4">
                  <DialogTrigger asChild>
                    <Link href={"/"}>
                      <Button
                        variant="outline"
                        className="rounded-full text-white hover:text-white bg-[#3498db] hover:bg-[#3498db]"
                        size="sm"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </DialogTrigger>
                  <VisuallyHidden>
                    <DialogTitle>Hey</DialogTitle>
                  </VisuallyHidden>

                  <DialogContent className="bg-transparent outline-none border-none sm:max-w-[800px] p-0">
                    <div className="w-full max-w-md lg:max-w-4xl lg:p-4 lg:h-[470px] lg:flex lg:items-center lg:justify-between p-0 bg-white rounded-xl custom-shadow relative md:leading-[10vh] lg:leading-[5vh] md:py-16 lg:space-y-10">
                      <div className="hidden lg:block left-[4%]">
                        <Image
                          src="/image/Star 5.png"
                          alt="star"
                          width={90}
                          height={90}
                          className="absolute bottom-[34%] left-[24%]"
                        />
                        <Image
                          src="/image/Star 5.png"
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

                      {/* small screen */}
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
                              isSubmittingSignUp={isSubmittingSignUp}
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
                                    ? "Loading..."
                                    : "Sign up with Google"}
                                </span>
                              </Button>
                            </Link>
                            <p className="text-[#747a7e]  text-center text-[11px] font-medium leading-none tracking-wide">
                              Already have an account?{" "}
                              <span
                                onClick={switchToLogin}
                                className="text-[#3498db] text-[11px] font-bold cursor-pointer underline leading-none tracking-wide"
                              >
                                Log in
                              </span>
                              <span className="text-[#747a7e]"> instead!</span>
                            </p>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            </div>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}

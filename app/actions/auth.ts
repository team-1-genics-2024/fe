"use server";

import { cookies } from "next/headers";

export type SignUpResponse = {
  success: boolean;
  error: string;
};

export type LoginResponse = {
  success: boolean;
  error: string | null;
  token?: string;
};

// -- SIGN UP --
export async function signupAction(
  prevState: SignUpResponse,
  formData: FormData
): Promise<SignUpResponse> {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${apiBaseUrl}api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseData = await response.json();
    console.log("Raw Response:", responseData);

    if (Array.isArray(responseData) && responseData[1]?.success === false) {
      return {
        success: false,
        error: responseData[1].error || "Registration failed",
      };
    }

    if (responseData.success === false) {
      return {
        success: false,
        error: responseData.error || "Registration failed",
      };
    }

    if (responseData.resultCode === 200) {
      // Store the accessToken in localStorage
      localStorage.setItem("accessToken", responseData.data.accessToken);
      console.log(localStorage.getItem("accessToken"));
    }

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

// -- LOG IN --
export async function loginAction(
  prevState: LoginResponse,
  formData: FormData
): Promise<LoginResponse> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}api/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.error("Server responded with status:", response.status);
      const text = await response.text();
      console.error("Response text:", text);
      return {
        success: false,
        error: `Server error: ${response.status}`,
      };
    }

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return {
        success: false,
        error: "Invalid response from server",
      };
    }

    console.log("Raw Response:", responseData);

    if (responseData.success === false) {
      return {
        success: false,
        error: responseData.error || "Login failed",
      };
    }

    cookies().set("token", responseData.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    return {
      success: true,
      error: "",
      token: responseData.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

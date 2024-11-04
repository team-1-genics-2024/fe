"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SocialAuth() {
  const googleLogin = "https://api.beteam1genics.my.id/api/auth/google";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authSuccess, setAuthSuccess] = useState(true);
  const [tokenStatus, setTokenStatus] = useState(false);

  useEffect(() => {
    if (authSuccess || tokenStatus) {
      const url = window.location.href;
      const code = url.match(/\?code=(.*)/);
      if (!tokenStatus && authSuccess) {
        if (code) {
          authenticateUser(code[1]);
        } else {
          router.push("/login");
        }
      } else if (tokenStatus) {
        // Redirect to previous page or home page
        setTimeout(() => {
          const next = searchParams.get("next") || "/dashboard";
          router.push(next);
        }, 1000);
      } else {
        router.push("/login");
      }
    }
  }, [tokenStatus, authSuccess]);

  const authenticateUser = async (code: string) => {
    try {
      // const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: code, type: "social" }),
      });

      if (res.ok) {
        setTokenStatus(true);
      } else {
        // handle error state here
        setAuthSuccess(false);
      }
    } catch (error) {
      // handle error state here
      setAuthSuccess(false);
    }
  };

  return (
    <>
      <div>
        {authSuccess ? (
          <div>
            <h1>Authenticating...</h1>
          </div>
        ) : (
          <div>
            <h1>
              {" "}
              An error occurred while attempting to authenticate your account
              with Google{" "}
            </h1>

            <div>
              <div>
                <Link href={googleLogin}>Please try again</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SocialAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = window.location.href;
    const code = url.match(/\?code=(.*)/);

    if (code) {
      signIn("google", { callbackUrl: "/dashboard", code: code[1] });
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (session) {
      const next = searchParams.get("next") || "/dashboard";
      router.push(next);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router, searchParams]);

  return (
    <>
      <div>
        <h1>Authenticating...</h1>
      </div>
    </>
  );
}

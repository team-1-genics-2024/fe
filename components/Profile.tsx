"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "./loading-screen";

class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiResponse = {
  data: string;
  user?: any;
};

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/protected");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/");
            return;
          }
          throw new ApiError(
            "Failed to fetch data",
            res.status,
            res.statusText
          );
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(`${err.message} (Status: ${err.status})`);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [router]);

  if (error)
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-md">
        Error: {error}
      </div>
    );

  if (!data) return <LoadingScreen />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Route Handler Usage</h1>
      <p>
        This page fetches data from an API Route Handler . The API is protected
        using the universal <code>auth()</code>
        method.
      </p>
      <div className="flex flex-col rounded-md bg-gray-100">
        <div className="rounded-t-md bg-gray-200 p-4 font-bold">
          Data from API Route
        </div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

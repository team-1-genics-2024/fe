"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import SubClassCard from "@/components/subclass/subclass-card";

import SideMenuMobile from "./SideMenuMobile";
import SideMenuDesktop from "./SideMenuDesktop";
import CustomScrollbar from "@/components/subclass/scrollbar-subclass";
import SubClassNextPage from "./SubClassNextPage";
import { useRouter } from "next/navigation";
import LoadingUnprotectedRoute from "@/components/layout/loading/loading-unprotected-route";
import ErrorNoSubClassFound from "@/components/layout/error/error-no-subclass-found";
import { SubClassData, MembershipData } from "@/types/subclass";
import ProtectedRoute from "@/app/protected/route";

export default function SubClass({ slug }: { slug: number }) {
  const router = useRouter();

  const [data, setData] = useState<SubClassData | null>(null);
  const [member, setMember] = useState<MembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  // === GET MEMBERSHIP DATA ===
  const fetchMember = async () => {
    try {
      const response = await fetch(`${baseApiUrl}api/membership/remaining`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.message || "Failed to fetch membership data."
        );
        return;
      }

      const responseData = await response.json();
      setMember(responseData.data);
    } catch (error) {
      console.error("Membership Network Error:", error);
      setError("A network error occurred while fetching membership data.");
    }
  };

  // === GET SUB TOPIC DATA ===
  const fetchSubClassData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseApiUrl}api/topic/subtopic/${slug}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch subclass data.");
      }

      const responseData = await response.json();
      setData(responseData.data);
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Network error occurred."
      );
    }
  };

  // === HANDEL MEMBERSHIP EXPIRED ===
  useEffect(() => {
    if (member?.remainingDays === 0) {
      setError(
        "Your membership has expired. Please renew your membership to access this content."
      );
      router.push("/payment");
    }
  }, [member, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await fetchMember();
        await fetchSubClassData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return <LoadingUnprotectedRoute />;
  }

  if (error) {
    return <ErrorNoSubClassFound />;
  }

  return (
    <ProtectedRoute>
      <Layout withNavbar={true} withFooter={false} withPadding={false}>
        <main className="min-h-screen flex flex-col md:flex-row">
          <SideMenuMobile classId={data?.classId} />

          <div className="flex w-full">
            <SideMenuDesktop />

            <CustomScrollbar className="lg:mr-32">
              {/* SUBCLASS TIAP HALAMAN */}
              {data && (
                <SubClassCard
                  judul={data.name}
                  textbook={data.description}
                  video={data.videoUrl}
                  classId={data.classId}
                  subtopicId={data.subtopicId}
                />
              )}

              {/* BUTTON */}
              <SubClassNextPage slug={slug} classId={data?.classId} />
            </CustomScrollbar>
          </div>
        </main>
      </Layout>
    </ProtectedRoute>
  );
}

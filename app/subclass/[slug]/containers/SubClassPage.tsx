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
import { SubClassData, MembershipData } from "@/types/subclass";
import ProtectedRoute from "@/app/protected/route";

export default function SubClass({ slug }: { slug: number }) {
  const router = useRouter();

  const [data, setData] = useState<SubClassData | null>(null);
  const [member, setMember] = useState<MembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  // === GET MEMBERSHIP DATA ===
  const fetchMember = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseApiUrl}api/membership/remaining`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        setError(errorData?.message || "Failed to fetch membership data.");
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
        console.error("Subclass Error Response:", errorData);
        setError(errorData?.message || "Failed to fetch subclass data.");
        return;
      }

      const responseData = await response.json();
      console.log("Subclass Data:", responseData.data);
      setData(responseData.data);
    } catch (error) {
      console.error("Subclass Network Error:", error);
      setError("A network error occurred while fetching subclass data.");
      console.error(error instanceof Error ? error.message : "Unknown error");
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
    setIsLoading(true);

    const fetchData = async () => {
      await fetchMember();
      await fetchSubClassData();
      setIsLoading(false);
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <LoadingUnprotectedRoute />;
  }

  return (
    <ProtectedRoute>
      <Layout withNavbar>
        <main className="min-h-screen flex flex-col md:flex-row">
          <SideMenuMobile classId={data?.classId} />

          <div className="flex w-full">
            <SideMenuDesktop />

            <CustomScrollbar className="lg:mr-32">
              {data && (
                <SubClassCard
                  judul={data.name}
                  textbook={data.description}
                  video={data.videoUrl}
                  classId={data.classId}
                  subtopicId={data.subtopicId}
                />
              )}

              <SubClassNextPage slug={slug} classId={data?.classId} />
            </CustomScrollbar>
          </div>
        </main>
      </Layout>
    </ProtectedRoute>
  );
}

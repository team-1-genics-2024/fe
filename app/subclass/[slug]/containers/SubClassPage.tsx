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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  // Membership Data
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

  // Sub Topic Data
  const fetchSubClassData = async () => {
    try {
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
      setData(responseData.data);
    } catch (error) {
      console.error("Subclass Network Error:", error);
      setError("A network error occurred while fetching subclass data.");
    }
  };

  // Handle membership expiration
  useEffect(() => {
    if (member?.remainingDays === 0) {
      setError(
        "Your membership has expired. Please renew your membership to access this content."
      );
      router.push("/payment");
    }
  }, [member, router]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      await fetchMember();
      await fetchSubClassData();
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingUnprotectedRoute />;
  }

  if (error) {
    return <ErrorNoSubClassFound />;
  }

  return (
    <ProtectedRoute>
      <Layout withNavbar={true} withFooter={false} withPadding={false}>
        <main className="min-h-screen flex flex-col md:flex-row">
          <SideMenuMobile />

          <div className="flex w-full">
            <SideMenuDesktop />

            <CustomScrollbar className="lg:mr-32">
              {/* SUBCLASS TIAP HALAMAN */}
              {data && (
                <SubClassCard
                  judul={data.name}
                  textbook={data.description}
                  video={data.videoUrl}
                />
              )}

              {/* BUTTON */}
              <SubClassNextPage slug={slug} />
            </CustomScrollbar>
          </div>
        </main>
      </Layout>
    </ProtectedRoute>
  );
}

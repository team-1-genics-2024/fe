"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SubClassNextPage({ slug }: { slug: number }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(Number(slug));

  // BUTTON NAVIGATION
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkNextData = async () => {
      const nextIndex = currentIndex + 1;
      const response = await fetch(
        `${baseApiUrl}api/topic/subtopic/${nextIndex}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok || (await response.json()).data.length === 0) {
        setIsNextDisabled(true);
      } else {
        setIsNextDisabled(false);
      }
    };

    checkNextData();
  }, [currentIndex, baseApiUrl, token]);

  useEffect(() => {
    const checkPreviousData = async () => {
      const previousIndex = currentIndex - 1;
      if (previousIndex < 0) {
        setIsPreviousDisabled(true);
        return;
      }

      const response = await fetch(
        `${baseApiUrl}api/topic/subtopic/${previousIndex}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok || (await response.json()).data.length === 0) {
        setIsPreviousDisabled(true);
      } else {
        setIsPreviousDisabled(false);
      }
    };

    checkPreviousData();
  }, [currentIndex, baseApiUrl, token]);

  const goToPrevious = () => {
    const newIndex = Number(currentIndex) - 1;
    setCurrentIndex(newIndex);
    router.push(`/subclass/${newIndex}`);
  };

  const goToNext = () => {
    const newIndex = Number(currentIndex) + 1;
    setCurrentIndex(newIndex);
    router.push(`/subclass/${newIndex}`);
  };

  return (
    <section className="mt-4 md:px-[50px] lg:px-[90px] md:mt-24">
      <div className="flex justify-center md:justify-between">
        <div>
          <Link href="/class">
            <button className="text-[#3498DB] group hover:text-blue-300 px-4 py-2 flex rounded-full max-md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 items-center mr-2 fill-[#3498DB] group-hover:fill-blue-300"
                viewBox="0 0 24 24"
              >
                <path d="M5.86875 9.75L10.0688 13.95L9 15L3 9L9 3L10.0688 4.05L5.86875 8.25H15V9.75H5.86875Z" />
              </svg>
              Kembali ke Class
            </button>
          </Link>
        </div>
        <div className="flex flex-row md:relative max-md:absolute px-9 max-md:bottom-4 max-md:left-0 max-md:w-full">
          <button
            onClick={goToPrevious}
            disabled={isPreviousDisabled}
            className={`${
              isPreviousDisabled ? "opacity-50 cursor-not-allowed" : ""
            } text-[#3498DB] text-[14px] max-md:w-full items-center max-md:justify-center hover:text-blue-300 px-4 py-2 flex border border-black rounded-full`}
          >
            Materi Sebelumnya
          </button>

          <button
            onClick={goToNext}
            disabled={isNextDisabled}
            className={`${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            } bg-[#3498DB] text-[14px] max-md:w-full max-md:justify-center ml-4 text-white hover:bg-blue-300 px-4 py-2 rounded-full`}
          >
            Materi Selanjutnya
          </button>
        </div>
      </div>
    </section>
  );
}

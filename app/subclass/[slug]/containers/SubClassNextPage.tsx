"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SubClassNextPage({
  slug,
  topicId,
}: {
  slug: number;
  topicId?: number;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(Number(slug));

  // BUTTON NAVIGATION
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  // === CHECK NEXT DATA ===
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

  // === CHECK PREVIOUS DATA ===
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
          credentials: "include",
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

  const goToTopic = () => {
    router.push(`/topics/${topicId}`);
  };

  return (
    <section className="mt-20 md:px-[5px] lg:px-[10px] md:mt-24 lg:mt-24">
      <div className="flex justify-center space-between items-center">
        <div className="flex-1 left-0 lg:left-10 mr-40">
          <button
            className="text-[#3498DB] group hover:text-blue-300 px-4 py-2 ml-8 flex items-center rounded-full max-md:hidden"
            onClick={goToTopic}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 mt-2 fill-[#3498DB] group-hover:fill-blue-300"
              viewBox="0 0 24 24"
            >
              <path d="M5.86875 9.75L10.0688 13.95L9 15L3 9L9 3L10.0688 4.05L5.86875 8.25H15V9.75H5.86875Z" />
            </svg>
            Kembali ke Topic
          </button>
        </div>

        <div className=" flex space-x-4 mb-2 mr-8">
          <button
            onClick={goToPrevious}
            disabled={isPreviousDisabled}
            className={`
          text-[#3498DB] text-[14px]
          px-4 py-2
          rounded-full
          outline
          hover:text-gray-200
          hover:bg-gray-100/50
          ${isPreviousDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
          >
            Sebelumnya
          </button>

          <button
            onClick={goToNext}
            disabled={isNextDisabled}
            className={`
          bg-[#3498DB]
          text-white
          text-[14px]
          px-4 py-3
          rounded-full
          outline 
          hover:bg-gray-100/50
          hover:text-gray-200
          ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchClassById } from "../app/classes/actions/class";
import { FaStar } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import { showToast } from "@/lib/toast";
import Layout from "./layout/Layout";
import LoadingUnprotectedRoute from "./layout/loading/loading-unprotected-route";
import ErrorNoClassFound from "./layout/error/error-no-class-found.tsx";

interface Class {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  totalTopics: number;
  totalSubtopics: number;
  totalParticipants: number;
}

export default function ClassDetail() {
  const params = useParams();
  const [classData, setClassData] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const router = useRouter();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleVisitTopics = () => {
    if (classData) {
      router.push(`/topics/${classData.id}`);
    }
  };

  const handleRating = async () => {
    try {
      await fetch(`${baseApiUrl}api/class/${classData?.id}/rating`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });
      setClassData((prevData) => ({ ...prevData, rating } as Class));
      console.log(setClassData);
      setIsRatingModalOpen(false);
      showToast("Thank you for your honest review", "success");
    } catch (error) {
      console.error("Error updating rating:", error);
      showToast("Error updating rating", "error");
    }
  };

  useEffect(() => {
    const loadClassDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!params.id || Array.isArray(params.id)) {
          throw new Error("Invalid class ID");
        }

        const fetchedClass: Class = await fetchClassById(parseInt(params.id));
        setClassData(fetchedClass);
      } catch (err) {
        setError("Failed to load class details. Please try again later.");
        console.error("Error loading class details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClassDetail();
  }, [params.id]);

  if (isLoading) {
    return <LoadingUnprotectedRoute />;
  }

  if (error || !classData) {
    return <ErrorNoClassFound />;
  }

  const truncatedTitle =
    classData.name.length > 11
      ? `${classData.name.slice(0, 11)}...`
      : classData.name;

  return (
    <Layout withNavbar withFooter>
      <div className="min-h-screen py-8 px-4 mt-20 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-[11%] lg:top-[20%] md:top-[7%] -z-20">
          <Image
            src="/image/homepage/lowerrightstar.png"
            alt="Left Star"
            width={100}
            height={100}
          />
        </div>

        <div className="absolute right-0 top-[103%] lg:top-[80%] md:top-[95%] xl:top-[80%] -z-20">
          <Image
            src="/image/homepage/upperrightstar.png"
            alt="Right Star"
            width={120}
            height={120}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[300px] custom-box overflow-hidden mb-2 group">
            <Image
              src={`/${classData.imageUrl}`}
              alt={classData.name}
              width={450}
              height={450}
              className="object-cover transition-transform duration-500 group-hover:scale-105
         
          px-0 ml-1
         
          sm:px-0 sm:ml-8
         
          md:px-0 md:ml-20

          lg:px-0 lg:ml-20"
              priority={true}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#3498DB]/30 to-transparent" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1
                className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-gray-700 cursor-pointer hover:text-[#3498DB] transition-colors duration-300 break-words"
                onClick={() => setShowFullTitle(true)}
              >
                {showFullTitle ? classData.name : truncatedTitle}
              </h1>
              <div
                className="flex items-center px-4 py-2 rounded-full cursor-pointer"
                onClick={() => setIsRatingModalOpen(true)}
              >
                {[...Array(5)].map((_, index) =>
                  index < Math.round(classData.rating) ? (
                    <FaStar key={index} className="text-[#3498DB] mr-1" />
                  ) : (
                    <FaStar key={index} className="text-gray-300 mr-1" />
                  )
                )}
                <span className="ml-2 font-medium text-gray-700">
                  {classData.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl text-center transition-all duration-300 hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 truncate">Topics</p>
                <p className="text-lg font-semibold text-gray-800">
                  <CountUp end={classData.totalTopics} duration={3.5} />
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center transition-all duration-300 hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 truncate">Subtopics</p>
                <p className="text-lg font-semibold text-gray-800">
                  <CountUp end={classData.totalSubtopics} duration={3.5} />
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center transition-all duration-300 hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 truncate">
                  Participants
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  <CountUp
                    end={classData.totalParticipants}
                    duration={3.5}
                    separator=","
                  />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-[#3498DB] pl-4">
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium text-gray-800">
                  {new Date(classData.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
              <div className="border-l-4 border-[#3498DB] pl-4">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-800">
                  {new Date(classData.updatedAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="w-full group"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#3498DB] transition-colors duration-300">
                    Description
                  </h2>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      isDescriptionExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  isDescriptionExpanded ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {classData.description}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-[#3498DB] text-white px-8 py-3 rounded-full hover:bg-[#2980b9] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={handleVisitTopics}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isRatingModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col h-[300px]">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-16">
              Rate this class
            </h2>
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-[#3498DB] mr-2 cursor-pointer ${
                    star <= rating ? "fill-current" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <div className="flex justify-end mt-auto">
              <button
                className="bg-[#3498DB] text-white px-6 py-2 rounded-full hover:bg-[#2980b9] transition-colors duration-300 mr-2 shadow-md"
                onClick={handleRating}
              >
                Save
              </button>
              <button
                className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full px-6 py-2 transition-colors duration-300 shadow-md"
                onClick={() => setIsRatingModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

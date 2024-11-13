"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { fetchClassById } from "../app/classes/actions/class";
import { FaStar } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";

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

  const handleVisitTopics = () => {
    if (classData) {
      router.push(`/topics/${classData.id}`);
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
    return (
      <Layout withNavbar withFooter>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB]"></div>
        </div>
      </Layout>
    );
  }

  if (error || !classData) {
    return (
      <Layout withNavbar withFooter>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {error || "Class not found"}
            </h1>
            <button
              onClick={() => window.history.back()}
              className="bg-[#3498DB] text-white px-6 py-3 rounded-full hover:bg-[#2980b9] transition-colors duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const truncatedTitle =
    classData.name.length > 11
      ? `${classData.name.slice(0, 11)}...`
      : classData.name;

  return (
    <Layout withNavbar withFooter>
      <div className="min-h-screen py-8 px-4 mt-12 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/3 -z-20">
          <Image
            src="/image/homepage/leftstar.png"
            alt="Left Star"
            width={100}
            height={100}
          />
        </div>

        <div className="absolute right-0 top-2/3 -z-20">
          <Image
            src="/image/homepage/rightstar.png"
            alt="Right Star"
            width={100}
            height={100}
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative w-full h-[300px] custom-box overflow-hidden mb-2 group">
            <Image
              src="/image/homepage/sejarah.png"
              alt={classData.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={true}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1
                className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-gray-700 cursor-pointer hover:text-[#3498DB] transition-colors duration-300 break-words"
                onClick={() => setShowFullTitle(true)}
              >
                {showFullTitle ? classData.name : truncatedTitle}
              </h1>{" "}
              <div className="flex items-center px-4 py-2 rounded-full">
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
      </div>
    </Layout>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { fetchClassById } from "../app/classes/actions/class";
import { Star } from "lucide-react";

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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
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

  return (
    <Layout withNavbar withFooter>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Class Image */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src="/image/homepage/sejarah.png"
              alt={classData.name}
              fill
              className="object-cover"
              priority={true}
            />
          </div>

          {/* Class Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {classData.name}
              </h1>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) =>
                  index < Math.round(classData.rating) ? (
                    <Star key={index} className="text-yellow-500 mr-1" />
                  ) : (
                    <Star key={index} className="text-gray-400 mr-1" />
                  )
                )}
                <span className="ml-2 font-medium">
                  {classData.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Total Topics</p>
                <p className="font-semibold">{classData.totalTopics}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Subtopics</p>
                <p className="font-semibold">{classData.totalSubtopics}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Participants</p>
                <p className="font-semibold">
                  {classData.totalParticipants.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Created:</p>
                <p className="font-semibold">
                  {new Date(classData.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated:</p>
                <p className="font-semibold">
                  {new Date(classData.updatedAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {classData.description}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-[#3498DB] text-white px-8 py-3 rounded-full hover:bg-[#2980b9] transition-colors duration-300">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

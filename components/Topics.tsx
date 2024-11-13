"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";

interface Topic {
  name: string;
  description: string;
  topicId: number;
  subtopicId: number;
  imageUrl: string;
  videoUrl: string;
}

interface TopicResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    topics: Topic[];
  };
}

export default function TopicsPage() {
  const params = useParams();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!params.topicId || Array.isArray(params.topicId)) {
          throw new Error("Invalid topic ID");
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(
          `${apiBaseUrl}api/topic/${params.topicId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const jsonData: TopicResponse = await response.json();

        if (jsonData.resultCode !== 200) {
          throw new Error(`Error: ${jsonData.resultMessage}`);
        }

        setTopics(jsonData.data?.topics || []);
      } catch (err) {
        setError("Failed to load topics. Please try again later.");
        console.error("Error loading topics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [params.topicId]);

  if (isLoading) {
    return (
      <Layout withNavbar withFooter>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB]"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout withNavbar withFooter>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Topics</h1>

          {topics && topics.length > 0 ? (
            <div className="grid gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.topicId}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {topic.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Created:{" "}
                      {new Date(topic.imageUrl).toLocaleDateString("id-ID")}
                    </span>
                    <span>
                      Updated:{" "}
                      {new Date(topic.videoUrl).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No topics found for this class.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

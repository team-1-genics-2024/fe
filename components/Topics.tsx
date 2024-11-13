"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

interface Topic {
  name: string;
  classId: number;
  SubTopic: SubTopics[];
}

interface SubTopics {
  name: string;
  topicId: number;
  subtopicId: number;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

interface TopicResponse {
  resultCode: number;
  resultMessage: string;
  data: Topic[];
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

        if (!params.classId || Array.isArray(params.classId)) {
          throw new Error("Invalid class ID");
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(
          `${apiBaseUrl}api/topic/${params.classId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const jsonData: TopicResponse = await response.json();
        console.log(jsonData);

        if (jsonData.resultCode !== 200) {
          throw new Error(`Error: ${jsonData.resultMessage}`);
        }

        setTopics(jsonData.data);
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
            <Accordion
              type="single"
              collapsible
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {topics.map((topic, index) => (
                <AccordionItem value={topic.name} key={topic.name}>
                  <AccordionTrigger className="w-full px-6 py-4 text-left text-xl font-medium text-gray-800">
                    Chapter {index + 1} : {topic.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 space-y-4">
                    {topic.SubTopic.map((subtopic) => (
                      <div
                        key={subtopic.subtopicId}
                        className="bg-gray-100 rounded-xl p-4"
                      >
                        <h3 className="text-lg font-normal text-gray-800">
                          {subtopic.name}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {subtopic.description}
                        </p>
                        {subtopic.imageUrl && (
                          <img
                            src="/image/homepage/sejarah.png"
                            // src={subtopic.imageUrl}
                            alt={subtopic.name}
                            className="mt-4 max-w-full h-auto rounded-xl"
                          />
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

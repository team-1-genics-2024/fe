"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

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

export default function ErrorNoTopicFound() {
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#3498db]/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center max-w-md mx-auto p-8 bg-[#3498db] rounded-2xl shadow-lg"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-white mb-4">{error}</h1>
        <motion.button
          onClick={() => window.history.back()}
          className="bg-white text-[#3498db] px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

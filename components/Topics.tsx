"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import Layout from "./layout/Layout";
import ErrorNoTopicFound from "./layout/error/error-no-topic-found";
import LoadingUnprotectedRoute from "./layout/loading/loading-unprotected-route";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
    return <LoadingUnprotectedRoute />;
  }

  if (error) {
    return <ErrorNoTopicFound />;
  }

  return (
    <Layout withNavbar withFooter>
      <motion.div
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute left-0 top-[15%] lg:top-[20%] md:top-[10%] -z-20">
          <Image
            src="/image/homepage/lowerrightstar.png"
            alt="Left Star"
            width={100}
            height={100}
          />
        </div>

        <div className="absolute right-0 top-[65%] md:top-[55%] lg:top-[100%] xl:top-[80%] -z-20">
          <Image
            src="/image/homepage/upperrightstar.png"
            alt="Right Star"
            width={120}
            height={120}
          />
        </div>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#3498db]/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#3498db]/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 10,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex">
            <ChevronLeft />
            <p>Back</p>
          </Link>
          <motion.div
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-700">
              Topics
            </h1>
            <motion.div
              className="w-24 h-1 mx-auto bg-[#3498db] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>

          {topics && topics.length > 0 ? (
            <motion.div
              className="space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={topic.name}
                      className="bg-[#3498db] rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border-none overflow-hidden"
                    >
                      <AccordionTrigger className="w-full px-6 sm:px-8 py-4 text-left text-xl font-medium text-white hover:bg-[#3498db]/90 transition-all duration-300 items-center">
                        <div className="flex items-center justify-center w-full space-x-4 py-2">
                          <motion.div
                            className="relative w-10 h-10 flex-shrink-0"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="absolute inset-0 bg-white/20 rounded-xl" />
                            <div className="absolute inset-0.5 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          </motion.div>
                          <span className="flex-grow text-start">
                            {topic.name}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 sm:px-8 py-6 space-y-6 sm:space-y-8 bg-white">
                        <AnimatePresence>
                          {topic.SubTopic.map((subtopic, idx) => (
                            <motion.div
                              key={subtopic.subtopicId}
                              className="relative bg-[#3498db]/5 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: idx * 0.1 }}
                              onHoverStart={() => setActiveCard(idx)}
                              onHoverEnd={() => setActiveCard(null)}
                              onTouchStart={() => setActiveCard(idx)}
                              onTouchEnd={() => setActiveCard(null)}
                            >
                              <motion.h3
                                className="relative text-lg font-medium text-[#3498db] mb-4 flex items-center space-x-3"
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <BookOpen className="w-5 h-5 bg-white" />
                                <span>{subtopic.name}</span>
                              </motion.h3>

                              {subtopic.imageUrl && (
                                <motion.div
                                  className="relative rounded-xl overflow-hidden shadow-lg"
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.02 }}
                                  animate={
                                    activeCard === idx
                                      ? {
                                          rotateX: 5,
                                          rotateY: 5,
                                        }
                                      : {
                                          rotateX: 0,
                                          rotateY: 0,
                                        }
                                  }
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                  }}
                                >
                                  <Image
                                    src={`/${subtopic.imageUrl}`}
                                    alt={subtopic.name}
                                    className="w-full h-auto"
                                    width={400}
                                    height={400}
                                  />
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-[#3498db]/20 to-transparent"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                  />
                                </motion.div>
                              )}

                              <motion.p
                                className="relative text-gray-600 mt-4 leading-relaxed whitespace-pre-line"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {subtopic.description}
                              </motion.p>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16 bg-[#3498db] rounded-2xl shadow-lg text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-16 h-16 mx-auto opacity-80 mb-4" />
              <p>No topics found for this class, please try again later</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}

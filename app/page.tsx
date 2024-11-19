"use client";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { Suspense, useEffect, useState } from "react";
import { fetchClassData } from "./actions/class";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ErrorNoClassFound from "@/components/layout/error/error-no-class-found.tsx";
import LoadingUnprotectedRoute from "@/components/layout/loading/loading-unprotected-route";

interface Class {
  id: number;
  name: string;
  imageUrl: string;
  totalTopics: number;
  totalSubtopics: number;
  rating: number;
  totalParticipants: number;
  updatedAt: string;
}

const LearningPathSection = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedClasses = await fetchClassData();
        setClasses(fetchedClasses);
      } catch (err) {
        setError("Failed to load classes. Please try again later.");
        console.error("Error loading classes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleClassDetailClick = (id: number) => {
    router.push(`/classes/${id}`);
  };

  if (isLoading) {
    return <LoadingUnprotectedRoute />;
  }

  if (error) {
    return <ErrorNoClassFound />;
  }

  return (
    <div>
      <h1 className="font-semibold text-4xl text-gray-800 text-center mb-16 mt-24">
        Daftar Learning Path Rancangan Experts
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            onClick={() => handleClassDetailClick(classItem.id)}
            className="cursor-pointer"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: [-1, 1, -1, 1, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 0.5,
                },
              },
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <CardHomepage
              src={`/${classItem.imageUrl}`}
              title={classItem.name}
              date={`${classItem.totalTopics} Topics - ${classItem.totalSubtopics} Subtopics`}
              participants={classItem.totalParticipants.toString()}
              rating={classItem.rating.toString()}
              status="enabled"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Layout withNavbar withFooter>
      <div>
        <div className="relative h-screen bg-white flex items-center justify-center text-center">
          <div className="absolute -right-[20px] top-[3%]">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Left Star"
              width={120}
              height={120}
            />
          </div>

          <div className="absolute left-[-20px] top-2/3 ">
            <Image
              src="/image/homepage/leftstar.png"
              alt="Right Star"
              width={190}
              height={190}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-start w-full left-[-10px]">
              <Image
                src="/image/homepage/upperrightstar.png"
                alt="Upper Left Star"
                width={100}
                height={100}
              />
            </div>

            <div className="text-center mt-2 w-full h-[40vh] overflow-hidden z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 w-full md:w-[690px]">
                Ayo raih prestasi gemilang bersama!
              </h1>
              <div className="space-x-4">
                <button className="bg-[#3498DB] text-white px-4 py-2 rounded-full">
                  Gabung sekarang
                </button>
                <button className="border border-[#3498DB] text-[#3498DB] px-4 py-2 rounded-full">
                  Lihat harga
                </button>
              </div>
            </div>

            <div className="flex justify-end top-[30%] w-full px-8">
              <Image
                src="/image/homepage/lowerrightstar.png"
                alt="Upper Right Star"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingUnprotectedRoute />}>
          <LearningPathSection />
        </Suspense>
      </div>
    </Layout>
  );
}

"use client";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { useEffect, useState } from "react";
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

export default function Home() {
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
    <Layout withNavbar withFooter>
      <div>
        <div className="relative h-screen bg-white flex items-center justify-center text-center">
          <div className="absolute -left-10 top-[10%] z-0">
            <Image
              src="/image/homepage/leftstar.png"
              alt="Left Star"
              width={100}
              height={100}
            />
          </div>

          <div className="absolute right-0 top-2/3 z-0">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Right Star"
              width={150}
              height={150}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-start w-full px-8">
              <Image
                src="/image/homepage/upperrightstar.png"
                alt="Upper Left Star"
                width={100}
                height={100}
                className="hidden md:block"
              />
            </div>

            <div className="text-center mt-2 w-full h-[40vh]  overflow-hidden z-10">
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

            <div className="flex justify-end w-full px-8">
              <Image
                src="/image/homepage/lowerrightstar.png"
                alt="Upper Right Star"
                width={100}
                height={100}
                className="hidden md:block"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-3xl text-center mb-16 mt-24">
            Daftar Learning Path Rancangan Experts
          </h1>
          <div className="flex flex-wrap justify-center gap-12">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                onClick={() => handleClassDetailClick(classItem.id)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [-1, 1, -1, 1, 0], // efek shake kecil
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
      </div>
    </Layout>
  );
}

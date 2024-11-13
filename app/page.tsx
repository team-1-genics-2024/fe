"use client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { useEffect, useState } from "react";
import { fetchClassData } from "./actions/class";
import { useRouter } from "next/navigation";

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

  const formatUpdatedDate = (date: string) => {
    return `Updated at: ${new Date(date).toLocaleDateString("id-ID")}`;
  };

  return (
    <Layout withNavbar withFooter>
      <div>
        {/* Hero Section */}
        <div className="relative h-screen bg-white flex items-center justify-center text-center">
          <div className="absolute left-0 top-1/3 z-0">
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
              width={100}
              height={100}
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

            <div className="text-center mt-6 w-full overflow-hidden z-10">
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
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                onClick={() => handleClassDetailClick(classItem.id)}
                className="cursor-pointer"
              >
                <CardHomepage
                  foto={"/image/homepage/sejarah.png"}
                  title={classItem.name}
                  date={`${classItem.totalTopics} Topics - ${classItem.totalSubtopics} Subtopics`}
                  participants={classItem.totalParticipants.toString()}
                  rating={classItem.rating.toString()}
                  status="enabled"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

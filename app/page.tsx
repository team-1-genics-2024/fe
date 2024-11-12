"use client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { useEffect, useState } from "react";
import { fetchClassData } from "./actions/class";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Class {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetchedClasses = await fetchClassData();
        setClasses(fetchedClasses);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load classes");
        console.error(error);
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleClassDetailClick = (id: number) => {
    router.push(`/classes/${id}`);
  };

  return (
    <Layout withNavbar withFooter>
      <div>
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

          {/* Main content */}
          <div className="flex flex-col items-center">
            {/* Top Section with Stars */}
            <div className="flex justify-start w-full px-8">
              <Image
                src="/image/homepage/upperrightstar.png"
                alt="Upper Left Star"
                width={100}
                height={100}
                className="hidden md:block"
              />
            </div>

            {/* Content Section */}
            <div className="text-center mt-6 w-full overflow-hidden z-10">
              <h1 className="text-2xl md:text-6xl font-bold mb-6 w-full md:w-[690px]">
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

        {/* Learning Path Section */}
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#3498DB] hover:underline"
            >
              Coba lagi
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-12">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                onClick={() => handleClassDetailClick(classItem.id)}
              >
                <CardHomepage
                  foto={"/image/homepage/sejarah.png"}
                  title={classItem.name}
                  date={new Date(classItem.createdAt).toLocaleDateString(
                    "id-ID"
                  )}
                  participants={classItem.description}
                  rating={classItem.updatedAt}
                  status="enabled"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

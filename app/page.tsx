"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import CardHomepage from "@/components/ui/CardHomepage";
import { useEffect, useState } from "react";
import { fetchClassData } from "@/app/actions/class";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetchedClasses = await fetchClassData();
        setClasses(fetchedClasses);
      } catch (error) {
        setError("Failed to load classes");
        console.error(error);
      }
    };

    loadClasses();
  }, []);

  const handleClick = () => {
    router.push("/classes");
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div>
        <div className="relative h-screen bg-white flex items-center justify-center text-center">
          {/* Star decorations */}
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                  Gabung sekarang
                </button>
                <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full">
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
        <div
          className="mt-12 px-8 text-center h-full mb-6"
          onClick={handleClick}
        >
          <h2 className="text-3xl font-bold mb-16">
            Daftar Learning Path Rancangan Experts
          </h2>
          {error && <p>{error}</p>}
          <div className="flex flex-wrap justify-center gap-12">
            {classes.map((classes, index) => (
              <CardHomepage
                key={index}
                foto="/image/homepage/sejarah.png"
                title={classes.name}
                date={classes.createdAt}
                participants={classes.description}
                rating={classes.updatedAt}
                status="enabled"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

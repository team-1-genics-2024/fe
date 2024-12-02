import { Class } from "@/types/class";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingUnprotectedRoute from "@/components/layout/loading/loading-unprotected-route";
import CardHomepage from "@/components/ui/CardHomepage";
import { fetchClassData } from "./actions/class";
import { motion } from "framer-motion";
import ErrorNoClassFound from "@/components/layout/error/error-no-class-found.tsx";

export const LearningPathSection = () => {
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
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

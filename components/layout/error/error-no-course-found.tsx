import Image from "next/image";
import Link from "next/link";

export const NoCourseFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
        You don't have any class yet
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Start your learning journey by exploring our available courses
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-sm rounded-full text-white bg-[#3498DB] hover:bg-[#2980B9] transition-colors"
      >
        Explore now
      </Link>
    </div>
  );
};

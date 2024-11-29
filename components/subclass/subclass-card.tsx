import dynamic from "next/dynamic";
import { SubClassCardProps } from "@/types/subclass";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function SubClassCard({
  judul,
  video,
  textbook,
  subtopicId,
  classId,
}: SubClassCardProps) {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const handleVideoEnd = async () => {
    try {
      const response = await fetch(
        `${baseApiUrl}api/progress/${classId}/${subtopicId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: "Video has ended",
          }),
        }
      );
      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error hitting API:", error);
    }
  };

  return (
    <div className="w-fit min-h-[60vh]">
      <section className="px-9 md:px-[50px] lg:px-[90px] w-fit">
        <h1
          className="text-[24px] md:text-[40px] mt-4 mb-8 font-semibold text-gray-700"
          id="course-video"
        >
          {judul}
        </h1>
        <div className="mt-2 md:mt-4 w-fit">
          <div className="relative md:pt-[56.25%] max-w-full w-[350px] h-[200px] md:w-[600px] md:h-[285px] sm:w-[300px] sm:h-[240px] lg:w-[900px] lg:h-[485px] rounded-full">
            <ReactPlayer
              url={video}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full z-40 rounded-full"
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
      </section>
      <section className="px-9 mt-8 md:px-[50px] lg:px-[50px] md:mt-16">
        <div id="text-book" className="flex items-center gap-4">
          <p className="text-[22px] md:text-[32px] font-semibold text-gray-700 border-b-2 border-[#3498DB] inline-block mt-12 lg:ml-10">
            Textbook Materi
          </p>
        </div>
        <div className="mt-6 lg:ml-8 lg:mr-8 bg-gradient-to-br from-blue-50 to-gray-100 p-6 rounded-lg shadow-lg whitespace-pre-line">
          <div className="text-[14px] md:text-[16px] text-gray-800 leading-relaxed">
            {textbook ? textbook : "No textbook available"}
          </div>
        </div>
      </section>
    </div>
  );
}

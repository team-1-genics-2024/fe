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
        <h1 className="text-[24px] md:text-[45px]" id="course-video">
          {judul}
        </h1>
        <div className="mt-2 md:mt-4 w-fit">
          <div className="relative  md:pt-[56.25%] max-w-full w-[309px] h-[174px] md:w-[500px] md:h-[285px] lg:w-[833px] lg:h-[485px]">
            <ReactPlayer
              url={video}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full z-40"
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
      </section>
      <section className="px-9 mt-5 md:px-[50px] lg:px-[90px] md:mt-24">
        <div id="text-book">
          <p className="text-[22px] md:text-[32px]">Text Book Materi</p>
        </div>
        <div className="text-[14px] mt-2 md:text-[16px] whitespace-pre-line">
          {textbook}
        </div>
      </section>
    </div>
  );
}

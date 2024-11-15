import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export type SubClassCardProps = {
  judul?: string;
  video?: string;
  textbook?: string;
};

export default function SubClassCard({
  judul,
  video,
  textbook,
}: SubClassCardProps) {
  return (
    <div className="w-fit">
      <section className="px-9 md:px-[50px] lg:px-[90px] w-fit">
        <h1 className="text-[24px] md:text-[45px]" id="course-video">{judul}</h1>
        <div className="mt-2 md:mt-4 w-fit">
          <div className="relative  md:pt-[56.25%] max-w-full w-[309px] h-[174px] md:w-[500px] md:h-[285px] lg:w-[833px] lg:h-[485px]">
            <ReactPlayer
              url={video}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      </section>
      <section className="px-9 mt-5 md:px-[50px] lg:px-[90px] md:mt-24">
        <div id="text-book">
          <p className="text-[22px] md:text-[32px]">Text Book Materi</p>
        </div>
        <div className="text-[14px] mt-2 md:text-[16px]">{textbook}</div>
      </section>
    </div>
  );
}

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
    <div>
      {/* <section className="max-md:justify-start max-md:items-center max-md:flex max-md:flex-col md:px-[90px]"> */}
      <section className="px-9 md:px-[90px]">
        <h1 className="text-[24px] md:text-[45px]">{judul}</h1>
        <div className="mt-2 md:mt-4">
          {/* Wrapper untuk membuat video responsif */}
          <div className="relative  md:pt-[56.25%] max-w-full max-md:w-[309px] max-md:h-[174px] md:w-[900px] md:h-[485px]">
            {/* <ReactPlayer
              url="https://www.youtube.com/watch?v=9Yfj7dmcmXA"
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
            /> */}
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
      <section className="px-9 mt-5 md:px-[90px] md:mt-24">
        <div>
          <p className="text-[22px] md:text-[32px]">Text Book Materi</p>
        </div>
        <div className="text-[14px] mt-2 md:text-[16px]">{textbook}</div>
      </section>
    </div>
  );
}

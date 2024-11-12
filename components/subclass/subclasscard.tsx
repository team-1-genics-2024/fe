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
      <section className="px-[90px]">
        <h1 className="text-[45px]">{judul}</h1>
        <div className="mt-4">
          <ReactPlayer
            url={video}
            controls
            width={900}
            height={485}
            className="mt-4"
          />
        </div>
      </section>
      <section className="px-[90px] mt-24">
        <div>
          <p className="text-[32px]">Text Book Materi</p>
        </div>
        <div>{textbook}</div>
      </section>
    </div>
  );
}

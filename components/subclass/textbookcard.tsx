export type TextBookCardProps = {
  header: string;
  nama: string;
  kelas: string;
};
export default function TextBookCard({
  header,
  nama,
  kelas,
}: TextBookCardProps) {
  return (
    <div className="shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] bg-white rounded-[20px]">
      <div className="px-8 py-4 justify-between flex items-center">
        <div>
          <img src="" alt="" />

        </div>
        <div>
          <h3>{header}</h3>
          <p>{nama}</p>
          <p>{kelas}</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" />
        </svg>
      </div>
    </div>
  );
}

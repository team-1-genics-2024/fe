import {
  BurgerIcon,
  CourseVideoIcon,
  TextBookIcon,
} from "@/components/subclass/icon-subclass";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SideMenuMobile({ classId }: { classId?: number }) {
  const router = useRouter();

  const [sideActive, setSideActive] = useState(false);

  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
  };

  const scrollToSection = (id: string) => {
    setSideActive(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToTopic = () => {
    router.push(`/topics/${classId}`);
  };

  return (
    <section className="px-9 py-2 flex justify-between md:hidden">
      {/* Burger Icon */}
      <div className="items-center flex justify-cente">
        <div onClick={toggleActive} className="cursor-pointer">
          <BurgerIcon
            className={` ${
              sideActive ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
            } hover:fill-[#2F8AC7]`}
          />
        </div>

        {sideActive && (
          <div
            onClick={toggleActive}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          ></div>
        )}

        <div
          className={`fixed top-0 left-0 w-fit h-full bg-white shadow-lg transform ${
            sideActive ? "translate-x-0  z-[999]" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="p-4 mt-14 flex flex-col space-y-6 items-start">
            <div onClick={toggleActive} className="cursor-pointer ml-1">
              <BurgerIcon className={`fill-[#2F8AC7] hover:fill-[#454B4F]`} />
            </div>
            <CourseVideoIcon
              className="fill-[#454B4F] hover:fill-[#2F8AC7]"
              onClick={() => scrollToSection("course-video")}
            />
            <TextBookIcon
              className="fill-[#454B4F] hover:fill-[#2F8AC7]"
              onClick={() => scrollToSection("text-book")}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          className="text-[#3498DB] text-[14px] group hover:text-blue-300 px-4 py-2 flex rounded-full right-0"
          onClick={goToTopic}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px] justify-center flex items-center mr-2 fill-[#3498DB] group-hover:fill-blue-300"
            viewBox="0 0 18 18"
          >
            <path d="M5.86875 9.75L10.0688 13.95L9 15L3 9L9 3L10.0688 4.05L5.86875 8.25H15V9.75H5.86875Z" />
          </svg>
          Kembali
        </button>
      </div>
    </section>
  );
}

import {
  BurgerIcon,
  CourseVideoIcon,
  TextBookIcon,
} from "@/components/subclass/icon-subclass";
import SidebarMenu from "@/components/subclass/sidebar-menu";
import { useState } from "react";

export default function SideMenuDesktop() {
  const [sideMenu] = useState([true, false, false]);

  const [sideActive, setSideActive] = useState(false);
  const [sideMenuOpen] = useState(false);

  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
  };

  const scrollToSection = (id: string) => {
    setSideActive(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="absolute max-md:hidden md:relative bg-[#EBF5FB] pt-5 h-full w-[20%] col-span-2 md:col-span-3 z-50">
      <div className="flex flex-col gap-3">
        <div className="md:hidden flex">
          <div
            onClick={() => toggleActive()}
            className={`${
              sideActive ? "bg-[#2f8ac71a]" : ""
            } flex justify-between mx-3 py-4 px-3 rounded-[100px] hover:cursor-pointer hover:bg-[#2f8ac71a] group`}
          >
            <div className="flex items-center">
              <BurgerIcon
                className={`${
                  sideActive ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
                } group-hover:fill-[#2F8AC7]`}
              />
            </div>
          </div>
        </div>
        <SidebarMenu
          menuOpen={sideMenuOpen}
          onClick={() => scrollToSection("course-video")}
          title="Course Video"
          active={sideMenu[0]}
        >
          <CourseVideoIcon
            className={`${
              sideMenu[0] ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
            } group-hover:fill-[#2F8AC7]`}
          />
        </SidebarMenu>
        <SidebarMenu
          menuOpen={sideMenuOpen}
          onClick={() => scrollToSection("text-book")}
          title="Text Book"
          active={sideMenu[1]}
        >
          <TextBookIcon
            className={`${
              sideMenu[1] ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
            } group-hover:fill-[#2F8AC7]`}
          />
        </SidebarMenu>
      </div>
    </section>
  );
}

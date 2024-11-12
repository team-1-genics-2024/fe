'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SidebarMenu from "@/components/subclass/sidebarmenu";
import SubClassCard from "@/components/subclass/subclasscard";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  BurgerIcon,
  FavIcon,
  HomeIcon,
  SertivIcon,
} from "@/components/subclass/icon";
// import { SubClassData } from "@/types/subclass";
import { ApiResponse } from "@/types/api";

type SubClassData = {
  name: string;
  topicId: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
};

// Buat QueryClient di luar komponen agar tidak diinisialisasi ulang setiap kali
const queryClient = new QueryClient();

function SubClassComponent({ slug }: { slug: string }) {
  
  // SIDE MENU
  const [sideMenu, setSideMenu] = useState([true, false, false]);
  const [sideActive, setSideActive] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  //NEXT PAGE SUB CLASS
  const [currentIndex, setCurrentIndex] = useState(0);

  // SLUG
  // const { data } = useQuery<ApiResponse<SubClassData>>({
  //   queryKey: [`/topic/subtopic/6`],
  // });

  const { data, error } = useQuery<ApiResponse<SubClassData>>({
    queryKey: [`https://api.beteam1genics.my.id/api/topic/subctopic/6`],
    queryFn: async () => {
      const response = await fetch(`https://api.beteam1genics.my.id/api/topic/subtopic/6`); // pastikan URL benar
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log(error)
  console.log(data);
  // console.log(data?.data.name);

  // SIDE MENU
  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
    setSideMenuOpen((sideMenuOpen) => !sideMenuOpen);
  };

  // CONTOH DATA
  const subClasses = [
    {
      judul: "CHAPTER 1",
      video: "https://www.youtube.com/watch?v=kcnwI_5nKyA",
      textbook: "Lorem ipsum for chapter 1",
    },
    { judul: "CHAPTER 2", video: "", textbook: "Lorem ipsum for chapter 2" },
    { judul: "CHAPTER 3", video: "", textbook: "Lorem ipsum for chapter 3" },
  ];

  // Fungsi untuk navigasi antar subkelas
  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < subClasses.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <main className="min-h-screen py-20 overflow-hidden flex relative">
      <Layout withNavbar={true} withFooter={false}>
        <div className="absolute -right-[350px] w-[800px] h-[800px] rounded-full -z-20 blur-3xl bg-[radial-gradient(50%_50%_at_156.14%_-34.27%,_#F1C40F_0%,_#FFF9E7_46.4%,_#FEF9E7_100%)]"></div>
        <div className="absolute -bottom-[200px] w-[800px] h-[800px] rounded-full -z-20 blur-3xl bg-[radial-gradient(50%_50%_at_156%_-34%,_#3498DB_0%,_#FFF9E7_46%,_#EBF5FB_100%)]"></div>

        {/* SIDE BAR MENU */}
        <div className="w-[20%]">
          <section>
            <div className="grid grid-cols-12 gap-6 transition-all duration-300 ease-in-out">
              <div className="absolute md:relative bg-[#EBF5FB] pt-5 h-full w-auto md:w-[400%] col-span-2 md:col-span-3 z-50">
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
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <SidebarMenu
                    menuOpen={sideMenuOpen}
                    onClick={() => {
                      setSideMenu([true, false, false]);
                    }}
                    title="My Course"
                    active={sideMenu[0]}
                  >
                    <HomeIcon
                      className={`${
                        sideMenu[0] ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
                      } group-hover:fill-[#2F8AC7]`}
                    />
                  </SidebarMenu>
                  <SidebarMenu
                    menuOpen={sideMenuOpen}
                    onClick={() => setSideMenu([false, true, false])}
                    title="Certificate"
                    active={sideMenu[1]}
                  >
                    <SertivIcon
                      className={`${
                        sideMenu[1] ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
                      } group-hover:fill-[#2F8AC7]`}
                    />
                  </SidebarMenu>
                  <SidebarMenu
                    menuOpen={sideMenuOpen}
                    onClick={() => setSideMenu([false, false, true])}
                    title="Favorites"
                    active={sideMenu[2]}
                  >
                    <FavIcon
                      className={`${
                        sideMenu[2] ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
                      } group-hover:fill-[#2F8AC7]`}
                    />
                  </SidebarMenu>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SCROLLBAR */}
        <div>
          <div
            className="mr-4 flex-1 h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#54c4db] scrollbar-track-gray-200"
            id="scrollbar"
          >
            <style jsx>{`
              #scrollbar::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                background-color: rgba(255, 255, 255, 0.2);
              }
              #scrollbar::-webkit-scrollbar {
                height: 0.75vh;
                border-radius: 10px;
              }
              #scrollbar::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                background-color: #54c4db;
              }
              #scrollbar::-webkit-scrollbar-thumb:hover {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                background-color: #93c5fd;
                background-image: -webkit-linear-gradient();
              }
            `}</style>

            {/* SUBCLASS TIAP HALAMAN*/}
            <SubClassCard
              judul={data?.data.name}
              textbook={data?.data.description}
              video={data?.data.videoUrl}
            />
            {/* <SubClassCard
              judul="CHAPTER 1"
              textbook={data?.data.description}
              video={data?.data.videoUrl}
            /> */}

            {/* BUTTON */}
            <section className="px-[90px] mt-24">
              <div className="flex justify-between">
                <div>
                  <button className="text-[#3498DB] hover:text-blue-300 px-4 py-2 flex rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 items-center mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.86875 9.75L10.0688 13.95L9 15L3 9L9 3L10.0688 4.05L5.86875 8.25H15V9.75H5.86875Z" />
                    </svg>
                    Kembali ke Sejarah
                  </button>
                </div>
                <div className="flex flex-row">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`${
                      currentIndex === 0 ? "opacity-50 cursor-not-allowed " : ""
                    } text-[#3498DB] hover:text-blue-300 px-4 py-2 flex border border-black rounded-full`}
                  >
                    Materi Sebelumnya
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentIndex === subClasses.length - 1}
                    className={`${
                      currentIndex === subClasses.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } bg-[#3498DB] ml-4 text-white hover:bg-blue-300 px-4 py-2 rounded-full`}
                  >
                    Materi Selanjutnya
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </main>
  );
}

// Bungkus SubClass dengan QueryClientProvider
export default function SubClass({ slug }: { slug: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SubClassComponent slug={slug} />
    </QueryClientProvider>
  );
}

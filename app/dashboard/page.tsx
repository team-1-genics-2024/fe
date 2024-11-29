"use client";
import React, { useEffect, useState } from "react";
import { BurgerIcon, HomeIcon, SertivIcon } from "@/components/dasboard/Icon";
import SidebarMenu from "@/components/dasboard/SidebarMenu";
import Image from "next/image";
import SearchInput from "@/components/dasboard/SearchInput";
import { fetchEnrollData } from "./api/enroll";
import { Enroll } from "@/types/enroll";
import CardCourse from "@/components/dasboard/CardCourse";
import { fetchCertificate } from "./api/certificate";
import { CertificateDataResponse } from "@/types/certificate";
import MyCourse from "@/components/dasboard/MyCourse";
import Certificate from "@/components/dasboard/Certificate";
import ProtectedRoute from "../protected/route";
import { NoCourseFound } from "@/components/layout/error/error-no-course-found";

export default function Dashboard() {
  const [enroll, setEnroll] = useState<Enroll[]>([]);
  const [certificate, setCertificate] =
    useState<CertificateDataResponse | null>(null);
  const [searchEnroll, setSearchEnroll] = useState("m");

  useEffect(() => {
    fetchEnrollData({ searchEnroll }).then((data) => setEnroll(data));
  }, [searchEnroll]);

  useEffect(() => {
    fetchCertificate().then((res) => setCertificate(res));
  }, []);

  const [sideMenu, setSideMenu] = useState([true, false, false]);
  const [sideActive, setSideActive] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
    setSideMenuOpen((sideMenuOpen) => !sideMenuOpen);
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-start gap-6 transition-all  duration-300 ease-in-out">
        <div
          className={`${
            sideActive ? "absolute" : "relative"
          }  md:relative bg-[#EBF5FB]   pt-5 h-[90vh]  w-auto z-20`}
        >
          <div className=" flex flex-col gap-3 ">
            <div className="md:hidden flex">
              <div
                onClick={() => toggleActive()}
                className={`${
                  sideActive ? "bg-[#2f8ac71a]" : ""
                }   flex justify-between mx-3  py-4 px-3 rounded-[100px] hover:cursor-pointer hover:bg-[#2f8ac71a] group`}
              >
                <div className="flex items-center">
                  <BurgerIcon
                    className={`${
                      sideActive ? "fill-[#2F8AC7]" : "fill-[#454B4F]"
                    }  group-hover:fill-[#2F8AC7]`}
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
                }  group-hover:fill-[#2F8AC7]`}
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
                }  group-hover:fill-[#2F8AC7]`}
              />
            </SidebarMenu>
            <SearchInput
              menuOpen={sideMenuOpen}
              onChange={(e) => setSearchEnroll(e.target.value)}
            />
          </div>
        </div>
        <div
          className={`md:hidden block bg-[#EBF5FB] pt-5 w-[70px] ${
            sideActive ? "" : "hidden"
          }`}
        ></div>

        <div className="z-10">
          {sideMenu[0] && (
            <MyCourse>
              {!enroll || enroll.length === 0 ? (
                <NoCourseFound />
              ) : (
                enroll.map((data) => (
                  <CardCourse
                    key={data.id}
                    id={data.id}
                    rating={Math.round(data.rating * 100) / 100}
                    name={data.name}
                    description={data.description}
                    imageUrl={"/" + data.imageUrl}
                    totalUserProgress={data.totalUserProgress}
                    totalSubtopics={data.totalSubtopics}
                    linkButton={`/classes/${data.id}`}
                  />
                ))
              )}
            </MyCourse>
          )}
          {sideMenu[1] && (
            <Certificate certificate={certificate?.data.certificates || []} />
          )}
        </div>
        <div className="md:w-[200px] hidden lg:block z-0 absolute right-0 h-[80vh]  ">
          <div className="relative">
            <Image
              src={"/image/dashboard/Star.png"}
              alt="star"
              width={100}
              height={100}
              className="w-[90px] absolute left-2 top-9"
            />
            <Image
              src={"/image/dashboard/Star.png"}
              alt="star"
              width={100}
              height={100}
              className="w-[40px] absolute left-28 top-36"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BurgerIcon, HomeIcon, SertivIcon } from '@/components/dasboard/Icon';
import SidebarMenu from '@/components/dasboard/SidebarMenu';
import Image from 'next/image';
import SearchInput from '@/components/dasboard/SearchInput';
import { Enroll, fetchEnrollData } from '../actions/enroll';
import CardCourse from '@/components/dasboard/CardCourse';

const MyCourse = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-[100vh] md:h-[80vh] md:max-w-[800px] bg-[#F7FCFF] lg:px-12 xl:px-14 pt-6 pb-14 ">
      <h1 className="text-4xl font-medium mb-8 px-7">My Course</h1>
      <ScrollArea className="px-7 h-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">{children}</div>
      </ScrollArea>
    </div>
  );
};

const CardCertificate = () => {
  return (
    <div className="w-[300px] bg-white rounded-[12px] overflow-hidden shadow">
      <div className="w-full h-[200px] bg-[#F7FCFF]">
        <Image src="/certificate/1.png" width={300} height={180} className="object-cover h-full w-full" alt="courseImg" />
      </div>
      <div className="px-4 py-3">
        <h1 className="text-lg font-medium">Certificate</h1>
        <p className="text-xs text-slate-500">Certificate of completion</p>
      </div>
    </div>
  );
};

const Certificate = () => {
  return (
    <div className="h-[80vh] md:max-w-[800px] bg-[#F7FCFF] lg:px-12 xl:px-14 pt-6 pb-14">
      <h1 className="text-4xl font-medium mb-8 px-7">Certificate</h1>
      <ScrollArea className="px-7 h-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <CardCertificate />
        </div>
      </ScrollArea>
    </div>
  );
};

export default function Dashboard() {
  const [enroll, setEnroll] = useState<Enroll[]>([]);
  const [searchEnroll, setSearchEnroll] = useState('m');

  useEffect(() => {
    fetchEnrollData({ searchEnroll }).then((data) => setEnroll(data));
  }, [searchEnroll]);

  const [sideMenu, setSideMenu] = useState([true, false, false]);
  const [sideActive, setSideActive] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
    setSideMenuOpen((sideMenuOpen) => !sideMenuOpen);
  };

  console.log(enroll);

  return (
    <div className="flex justify-between gap-6 transition-all  duration-300 ease-in-out">
      <div className="absolute md:relative bg-[#EBF5FB]   pt-5  w-auto  ">
        <div className=" flex flex-col gap-3 ">
          <div className="md:hidden flex">
            <div onClick={() => toggleActive()} className={`${sideActive ? 'bg-[#2f8ac71a]' : ''}   flex justify-between mx-3  py-4 px-3 rounded-[100px] hover:cursor-pointer hover:bg-[#2f8ac71a] group`}>
              <div className="flex items-center">
                <BurgerIcon className={`${sideActive ? 'fill-[#2F8AC7]' : 'fill-[#454B4F]'}  group-hover:fill-[#2F8AC7]`} />
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
            <HomeIcon className={`${sideMenu[0] ? 'fill-[#2F8AC7]' : 'fill-[#454B4F]'}  group-hover:fill-[#2F8AC7]`} />
          </SidebarMenu>
          <SidebarMenu menuOpen={sideMenuOpen} onClick={() => setSideMenu([false, true, false])} title="Certificate" active={sideMenu[1]}>
            <SertivIcon className={`${sideMenu[1] ? 'fill-[#2F8AC7]' : 'fill-[#454B4F]'}  group-hover:fill-[#2F8AC7]`} />
          </SidebarMenu>
          {/* <SidebarMenu menuOpen={sideMenuOpen} onClick={() => setSideMenu([false, false, true])} title="Favorites" active={sideMenu[2]}> */}
          <SearchInput menuOpen={sideMenuOpen} onChange={(e) => setSearchEnroll(e.target.value)} />
          {/* <FavIcon className={`${sideMenu[2] ? 'fill-[#2F8AC7]' : 'fill-[#454B4F]'}  group-hover:fill-[#2F8AC7]`} /> */}
          {/* </SidebarMenu> */}
        </div>
      </div>
      <div className="md:hidden block bg-[#EBF5FB]   pt-5  w-[70px] "></div>

      <div className="col-span-10 md:col-span-9">
        {sideMenu[0] && (
          <MyCourse>
            {enroll?.map((data) => (
              <CardCourse
                key={data.id}
                id={data.id}
                rating={Math.round(data.rating * 100) / 100}
                name={data.name}
                description={data.description}
                imageUrl={'/' + data.imageUrl}
                totalUserProgress={data.totalUserProgress}
                totalSubtopics={data.totalSubtopics}
              />
            ))}
          </MyCourse>
        )}
        {sideMenu[1] && <Certificate />}
      </div>
      <div className="md:w-1/4 relative">
        <Image src={'/image/dashboard/Star.png'} alt="star" width={100} height={100} className="w-[90px] absolute left-7 top-9" />
        <Image src={'/image/dashboard/Star.png'} alt="star" width={100} height={100} className="w-[40px] absolute left-28 top-36" />
      </div>
    </div>
  );
}

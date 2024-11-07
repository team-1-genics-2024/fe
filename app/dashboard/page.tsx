'use client';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BurgerIcon, HomeIcon, SertivIcon } from '@/components/dasboard/Icon';
import SidebarMenu from '@/components/dasboard/SidebarMenu';
import Image from 'next/image';
import SearchInput from '@/components/dasboard/SearchInput';

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

function Dashboard() {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  // const headers = { Authorization: `Bearer ${token}` };

  const [sideMenu, setSideMenu] = useState([true, false, false]);
  const [sideActive, setSideActive] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleActive = () => {
    setSideActive((sideActive) => !sideActive);
    setSideMenuOpen((sideMenuOpen) => !sideMenuOpen);
  };

  return (
    <div className="grid grid-cols-12 gap-6 transition-all  duration-300 ease-in-out">
      <div className="absolute md:relative bg-[#EBF5FB]   pt-5 h-full w-auto col-span-2   md:col-span-3 z-50 ">
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
          <SearchInput menuOpen={sideMenuOpen} onChange={(e) => console.log(e.target.value)} />
          {/* <FavIcon className={`${sideMenu[2] ? 'fill-[#2F8AC7]' : 'fill-[#454B4F]'}  group-hover:fill-[#2F8AC7]`} /> */}
          {/* </SidebarMenu> */}
        </div>
      </div>
      <div className="md:hidden block bg-[#EBF5FB]   pt-5  w-[70px] col-span-2   md:col-span-3"></div>

      <div className="col-span-10 md:col-span-9">
        {sideMenu[0] && (
          <MyCourse>
            p
            {/* {classData?.map((data) => (
              <CardCourse key={data.id} rating={data.rating} id={data.id} name={data.name} description={data.description} imageUrl={data.imageUrl} createdAt={data.createdAt} updatedAt={data.updatedAt} />
            ))} */}
          </MyCourse>
        )}
        {sideMenu[1] && <Certificate />}
      </div>
    </div>
  );
}

export default Dashboard;

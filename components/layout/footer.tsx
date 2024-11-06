import Link from "next/link";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

import Image from "next/image";

export default function Footer() {
  const dataFooter = [
    {
      menu: "Learning More",
      child: [
        { name: "About Us", url: "/" },
        { name: "Press Release", url: "/" },
        { name: "Environment", url: "/" },
        { name: "Jobs", url: "/" },
        { name: "Privacy Policy", url: "/" },
        { name: "Contact Us", url: "/" },
      ],
    },
    {
      menu: "Course",
      child: [
        { name: "With Mentor", url: "/" },
        { name: "Study Independent", url: "/" },
      ],
    },
    {
      menu: "Forum",
      child: [
        { name: "User Forum", url: "/" },
        { name: "FAQ", url: "/" },
      ],
    },
  ];

  const dataSocialMedia = [
    { icon: InstagramLogoIcon, url: "https://www.instagram.com/is_expo/" },
    { icon: TwitterLogoIcon, url: "https://x.com/is_expo" },
    { icon: InstagramLogoIcon, url: "https://www.tiktok.com/@is_expo" },
    {
      icon: LinkedInLogoIcon,
      url: "https://www.linkedin.com/company/information-systems-expo-ise-2024/",
    },
  ];

  return (
    <footer className="flex w-full bg-[#16405C] px-[24px] py-[32px] shadow-md  md:px-6 xl:py-[50px]">
      <div className="flex w-full flex-col xl:px-4 max-w-4xl mx-auto p-4">
        <div className=" flex flex-col justify-between gap-8 px-0 md:flex-row  md:px-0 md:pb-[32px] xl:gap-16 xl:px-10 xl:pb-[100px]">
          <div className="flex flex-row items-center">
            <Image
              width={25}
              height={25}
              src="/image/homepage/icon_white.png"
              className=""
              alt="Logo Sproutlearn"
            />
            <p className="text-3xl font-semibold ml-2 text-[#ffff]">
              Sinaupo'o
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-8 sm:gap-4 md:flex-row">
            <div className="mb-4 flex w-full max-w-[340px] flex-col flex-wrap gap-x-4 gap-y-0 md:max-w-none md:flex-row xl:gap-x-8 xl:gap-y-0">
              {dataFooter.map((item, idx) => (
                <div
                  className={`flex flex-col gap-y-2 pb-[16px] xl:w-fit xl:gap-[6px]`}
                  key={idx}
                >
                  <p className="font-size[16px] text-neutral-50 md:text-base ">
                    {item.menu}
                  </p>
                  {item.child.map((val, idx) => (
                    <Link
                      href={val.url}
                      key={idx}
                      className="w-fit hover:underline"
                    >
                      <p
                        className={`cursor-pointer text-neutral-200 md:text-sm hover:text-white`}
                      >
                        {val.name}
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="-mt-[8px] flex w-full flex-col items-center justify-center border-t border-[#FFFFFF]  md:mt-[0px] md:flex-row md:justify-between md:pb-0 md:pt-[24px] xl:pt-[50px]">
          <div className="flex w-full  flex-col pt-8 md:flex-row md:justify-center md:px-0 md:pt-0">
            <p className="cursor-pointer text-[16px] md:text-sm xl:text-lg text-white">
              2024 Sinaupo'o |
            </p>{" "}
            <p className="md:text-sm xl:text-lg text-white">
              All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

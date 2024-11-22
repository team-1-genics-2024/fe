"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../layout/Layout";
import { AnimatedTestimonials } from "./Testimonials";

const About = () => {
  return (
    <Layout withNavbar withFooter>
      <section className="w-full overflow-x-visible">
        <div className="relative min-h-[60vh] flex items-center justify-center text-center w-full overflow-x-visible">
          <div className="absolute -left-10 top-[80%]">
            <Image
              src="/image/homepage/leftstar.png"
              alt="Left Star"
              width={160}
              height={160}
            />
          </div>

          <div className="absolute right-[-30px] top-[2%] md:top-[5%] lg:top-[1%]">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Right Star"
              width={120}
              height={120}
            />
          </div>

          <div className="absolute right-[-30px] top-[230%] md:top-[230%] lg:top-[200%]">
            <Image
              src="/image/homepage/rightstar.png"
              alt="Right Star"
              width={180}
              height={180}
            />
          </div>

          <div className="absolute top-[20%] left-[15%] md:top-[30%] md:left-[20%] lg:top-[4%] xl:left-[25%]">
            <Image
              src="/image/homepage/upperrightstar.png"
              alt="Upper Left Star"
              width={80}
              height={80}
            />
          </div>

          <div className="w-full mx-auto px-4 relative">
            <div className="flex flex-col items-center relative w-full">
              <div className="text-center my-4 md:my-6 lg:my-8 z-10">
                <h1 className="text-4xl text-gray-700 sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  About Us
                </h1>
              </div>

              <div className="absolute right-[2%] top-[95%] md:right-[10%] md:top-[90%] lg:right-[20%]">
                <Image
                  src="/image/homepage/lowerrightstar.png"
                  alt="Lower Right Star"
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[110vh] -mt-20 bg-white flex items-center justify-center z-50 w-full">
          <div className="text-center max-w-2xl mx-auto px-2">
            <div className="mb-8 z-[999]">
              <Link
                href="/"
                className="inline-flex items-center justify-center"
              >
                <h2 className="text-gray-700 font-semibold text-4xl mr-4">
                  Why
                </h2>
                <Image
                  src="/image/logo/logo.png"
                  alt="SinauPo'o Icon"
                  width={250}
                  height={250}
                  quality={100}
                />
              </Link>
            </div>

            <p className="text-gray-700 md:text-lg leading-relaxed mx-auto text-2xl z-[999]">
              Platform kursus online kami menawarkan kemudahan dan kepraktisan
              dalam belajar. Anda bisa belajar kapan saja dan di mana saja.
              Antarmuka yang ramah pengguna dan fitur interaktif kami dirancang
              agar proses belajar menjadi lebih mudah dan menyenangkan.
            </p>
          </div>
        </div>

        <AnimatedTestimonials />
      </section>
    </Layout>
  );
};

export default About;

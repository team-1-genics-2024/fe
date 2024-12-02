"use client";
import { useEffect, useState } from "react";
import { fetchCertificateDetail } from "../../api/certificate";
import { CertificateDataResponse } from "@/types/certificate";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function DetailSertifikat({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [certificate, setCertificate] =
    useState<CertificateDataResponse | null>(null);

  useEffect(() => {
    params.then((resolved) => {
      fetchCertificateDetail({ id: resolved.id }).then((data) =>
        setCertificate(data)
      );
    });
  }, [params]);
  return (
    <div className="container relative bg-[#EBF5FB] py-6 mx-auto h-full">
      <Link className="absolute left-4 top-6" href={"/dashboard"}>
        <IoArrowBack className="w-7 h-7" />
      </Link>
      <h1 className="mx-auto text-center text-xl font-bold mb-4">
        Digital Certificate SinauPo&apos;o
      </h1>
      <p className="mx-auto text-center w-3/4 mt-2">
        Sertifikat ini adalah dokumen resmi yang valid dan dirilis oleh
        SinauPo&apos;o untuk member atas nama{" "}
        <span className="text-black font-bold">
          {/* @ts-expect-error: Ignore TypeScript error for class property */}

          {certificate?.data?.certificate?.user.name}
        </span>{" "}
        karena telah menyelesaikan kursus{" "}
        {/* @ts-expect-error: Ignore TypeScript error for class property */}
        {certificate?.data?.certificate?.class.name}
      </p>
      <div className="mx-auto w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px] mt-6 relative">
        <p
          style={{ fontFamily: "Holiday, sans-serif" }}
          className="sm:text-3xl md:text-5xl lg:text-6xl text-blue-950 font-semibold absolute top-[30%] transform  -translate-x-1/2 left-1/2"
        >
          {" "}
          {/* @ts-expect-error: Ignore TypeScript error for class property */}
          {certificate?.data?.certificate?.user.name}
        </p>
        <p className="text-xs md:text-sm lg:text-xl text-blue-950 font-semibold absolute top-[46%] transform  -translate-x-1/2 left-1/2">
          {/* @ts-expect-error: Ignore TypeScript error for class property */}

          {certificate?.data?.certificate?.class.name}
        </p>
        <Image
          src={"/certificate/polosan.png"}
          alt="certificate"
          width={1920}
          height={1080}
          className="w-full h-full mb-8"
        />
      </div>
    </div>
  );
}

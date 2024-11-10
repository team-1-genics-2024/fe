import React from "react";
import Image from "next/image";

export default function ClassPage() {
  return (
    <section>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Sejarah</h1>
        <h2 className="text-xl font-bold mb-4">Chapter 1: Awal Mula</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/image/homepage/sejarah.png"
              width={30}
              height={30}
              alt="Judul Sub Chapter 1 - a"
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 1 - a</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 1 - b"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 1 - b</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 1 - c"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 1 - c</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 1 - d"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 1 - d</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Chapter 2: Berlanjut</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 2 - a"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 2 - a</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 2 - b"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 2 - b</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/"
              alt="Judul Sub Chapter 2 - c"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-sm font-medium">Judul Sub Chapter 2 - c</p>
          </div>
        </div>
      </div>
    </section>
  );
}

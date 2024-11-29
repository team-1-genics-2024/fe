"use client";

import AlertModal from "./ModalPayment";
import { PaymentProps } from "@/types/payment";

export default function PaymentCard({ header, price }: PaymentProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(price));

  return (
    <section className="p-8 border border-gray-300 rounded-xl flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-[#3498db]/5 to-[#3498db]/10">
      <p className="text-xl font-semibold text-gray-800 mb-4">{header}</p>
      <p className="text-gray-600 text-lg mb-8">{formattedPrice}</p>
      <div className="flex justify-end items-center mt-4">
        <AlertModal price={price}>
          {({ openModal }) => (
            <button
              className="
            bg-[#3498DB] text-white text-sm w-full md:w-[40%] flex items-center justify-center rounded-full 
 hover:bg-gray-100/50 hover:text-gray-200 outline transition-colors duration-300 px-4 py-2 border border-transparent
            shadow-sm hover:shadow-md"
              onClick={() => {
                openModal();
              }}
            >
              Buy
            </button>
          )}
        </AlertModal>
      </div>
    </section>
  );
}

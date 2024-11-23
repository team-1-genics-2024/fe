"use client";

import AlertModal from "./ModalPayment";
import { PaymentProps } from "@/types/payment";

export default function PaymentCard({ header, price }: PaymentProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(price));

  return (
    <section className="p-4 border-2 rounded-2xl flex flex-col bg-gradient-to-b from-[#3498db]/10 to-[#3498db]/5">
      <p className="text-[22px]">{header}</p>
      <p className="text-[#454B4F] text-[22px]">{formattedPrice}</p>
      <div className="flex justify-end items-center">
        <AlertModal price={price}>
          {({ openModal }) => (
            <button
              className="
                bg-[#3498DB] mt-6 text-[14px] w-[30%] flex items-center justify-center text-white hover:bg-blue-300 px-4 py-2 rounded-full"
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

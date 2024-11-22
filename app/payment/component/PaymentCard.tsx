"use client";

import AlertModal from "./ModalPayment";
import { PaymentProps } from "@/types/payment";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function PaymentCard({ header, price }: PaymentProps) {
  const numericPrice = Number(price);

  return (
    <section className="p-4 border-2 rounded-2xl flex flex-col">
      <p className="text-[22px]">{header}</p>
      <p className="text-[#454B4F] text-[22px]">
        {formatCurrency(numericPrice)}
      </p>
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

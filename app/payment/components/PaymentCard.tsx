"use client";

import AlertModal from "./ModalPayment";

export type PaymentProps = {
  header: string;
  price: string;
};

export default function PaymentCard({ header, price }: PaymentProps) {
  return (
    <section className="p-4 border-2 rounded-2xl flex flex-col">
      <p className="text-[22px]">{header}</p>
      <p className="text-[#454B4F] text-[22px]">Rp {price}</p>
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

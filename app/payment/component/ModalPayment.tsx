"use client";
import { useDisclosure } from "@nextui-org/react";
import React from "react";
import Modal from "@/components/ui/modal";
import { ModalReturnType, PaymentPost } from "@/types/payment";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function AlertModal({
  children,
  price,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  price: string;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const modalReturn: ModalReturnType = {
    openModal: onOpen,
  };

  // PAYMENT HANDLE
  const grossAmount = Number(price);
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(grossAmount);

  async function postPayment(grossAmount: number) {
    const token = localStorage.getItem("accessToken");
    const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const payload: PaymentPost = {
      transaction_details: {
        gross_amount: grossAmount,
      },
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(`${baseApiUrl}api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        toast.error(`Error: ${errorData.errorMessage || "An error occurred"}`);
        return { success: false, data: errorData };
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      return { success: true, data: responseData.data };
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error. Please try again.");
      return { success: false, data: error };
    }
  }

  async function handleBuy() {
    const result = await postPayment(grossAmount);
    if (result.success) {
      console.log("Payment posted successfully:", result.data);
      const urlLink = result.data;
      if (urlLink) {
        window.location.href = urlLink;
      } else {
        console.error("URL link not found in response data:", result.data);
        toast.error("Failed to retrieve URL link. Please try again.");
      }
    } else {
      console.error("Failed to post payment:", result.data);
    }
  }

  return (
    <>
      {children(modalReturn)}
      {isOpen && <div className="fixed inset-0 bg-black opacity-60 z-10" />}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        className="max-w-lg md:max-w-2xl mx-auto"
      >
        <div className="border-1.5 mt-4 bg-white p-3 sm:p-4 z-20 text-center justify-center">
          {" "}
          <div className="flex justify-center mb-6">
            <p className="flex text-3xl font-semibold text-center items-center gap-2">
              Confirm Payment
            </p>
          </div>
        </div>

        <div className="px-7 py-8 bg-white z-20 text-center mb-4">
          <p className="text-md">
            Are you sure want to buy this course for{" "}
            <span className="font-bold text-[#3498DB]">{formattedPrice}?</span>
          </p>
        </div>

        <div className="p-4 sm:p-4 bg-white z-20 flex justify-center mb-4">
          <div className="flex flex-wrap-reverse justify-center gap-3 sm:gap-5">
            <Button
              className={`
            bg-[#3498DB] text-[14px] flex items-center justify-center text-white 
            hover:bg-blue-300 px-6 py-2 rounded-full 
hover:bg-gray-100/50 hover:text-gray-200 outline`}
              onClick={handleBuy}
            >
              Continue
            </Button>
            <Button
              className={`
            bg-white text-[14px] flex px-6 py-2 items-center justify-center text-[#3498DB] 
            hover:text-gray-200 hover:bg-gray-100/50 outline rounded-full`}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

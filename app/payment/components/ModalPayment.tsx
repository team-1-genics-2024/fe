"use client";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

import Modal from "@/components/ui/modal";

type ModalReturnType = {
  openModal: () => void;
};

type PaymentPost = {
  transaction_details: TransactionDetails;
};

type TransactionDetails = {
  gross_amount: number;
};

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
        return { success: false, data: errorData };
      }
  
      const responseData = await response.json();
      console.log("Response Data:", responseData);
  
      return { success: true, data: responseData.data };
    } catch (error) {
      console.error("Network Error:", error);
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
        alert("Failed to retrieve URL link. Please try again.");
      }
    } else {
      console.error("Failed to post payment:", result.data);
      alert("Failed to post payment. Please try again.");
    }
  }
  

  return (
    <>
      {children(modalReturn)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
        <Modal.Header
          className="border-1.5 bg-warning-main p-3 sm:p-4"
          onClose={onClose}
          buttonCrossClassName="relative mr-0 mt-0 sm:mr-0 sm:mt-0 "
        >
          <div className="flex gap-1.5">
            <p className="flex items-center gap-2 text-lg md:text-xl">
              Order Confirmed
            </p>
          </div>
        </Modal.Header>

        <Modal.Body className="px-7 py-4 sm:p-4">
          <p className="text-sm sm:text-base/6">
            Are you sure want to buy this course?
          </p>
        </Modal.Body>

        <Modal.Footer className="px-7 py-4 sm:p-4">
          <div className="flex flex-wrap-reverse justify-center gap-3 sm:gap-7 ">
            <button
              className={`
                bg-[#3498DB] text-[14px] flex items-center justify-center text-white hover:bg-blue-300 px-4 py-2 rounded-full`}
              onClick={() => {
                handleBuy();
              }}
            >
              Continue
            </button>
            <button
              className={`
                bg-white text-[14px] flex items-center justify-center text-[#3498DB] hover:bg-slate-300 px-4 py-2 rounded-full`}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/* 
  This component uses nextui as its base material.
  Check for the documentation in https://nextui.org/docs/components/modal#modal
*/

import {
  Modal as NextModal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalProps,
  UseDisclosureProps,
} from "@nextui-org/react";

import React from "react";

type ContentProps = {
  className?: string;
  children?: React.ReactNode;
};
type TitleProps = {
  onClose: () => void; // Function to call on close button click
  buttonCrossClassName?: string; // Custom class name for the close button
  crossClassName?: string; // Custom class name for the cross icon within the close button
};
type ModalRootProps = {
  modelContainerClassName?: string; // Custom class name for the modal container
  backdropClassName?: string; // Custom class name for the modal backdrop
};

export function ModalRoot({
  //   className, // Class name for additional styling
  //   modelContainerClassName, // Custom class name for the modal content container
  children, // Children components to render inside the modal
  isOpen, // Boolean to control the open state of the modal
  onOpenChange, // Function to handle changes in the open state
  scrollBehavior = "outside", // Scroll behavior of the modal
  backdrop = "transparent", // Backdrop appearance
  backdropClassName, // Custom class for the backdrop
  ...rest // Rest of the props
}: ModalRootProps & ContentProps & UseDisclosureProps & ModalProps) {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true} // Hiding the default close button
      scrollBehavior={scrollBehavior}
      backdrop={backdrop}
      classNames={{
        wrapper: "flex-wrap items-center sm:items-center",
        backdrop: backdropClassName,
      }}
      {...rest}
    >
      <ModalContent
        className={
          "mx-4 my-6 rounded-xl border-4 bg-white p-0 shadow-none md:w-[50%] sm:mx-6 sm:my-8 sm:w-full sm:max-w-xl sm:p-0"
        }
      >
        {children}
      </ModalContent>
    </NextModal>
  );
}

export function Header({
  //   className,
  children,
  onClose, // Function to call when the close button is clicked
  //   buttonCrossClassName, // Custom class name for the close button
  //   crossClassName, // Custom class name for the cross icon
  ...rest
}: ContentProps & TitleProps & ModalHeaderProps) {
  return (
    <ModalHeader
      className={
        "flex items-center justify-center rounded-t-xl border-1.5 border-b-0 border-typo-outline-2 bg-typo-white text-lg font-semibold text-typo-main md:text-xl"
      }
      {...rest}
    >
      {children}
    </ModalHeader>
  );
}

export function Body({ children, ...rest }: ContentProps & ModalBodyProps) {
  return (
    <ModalBody
      className={
        "flex flex-col border-1.5 border-y-0 border-typo-outline-2 bg-typo-white text-typo-main"
      }
      {...rest}
    >
      {children}
    </ModalBody>
  );
}

export function Footer({
  //   className,
  children,
  ...rest
}: ContentProps & ModalFooterProps) {
  // Rendering the modal footer with custom classes for styling
  return (
    <ModalFooter
      className={
        "flex flex-col rounded-b-xl border-1.5 border-t-0 border-typo-outline-2 bg-typo-white text-typo-main"
      }
      {...rest}
    >
      {children}
    </ModalFooter>
  );
}

// Combining ModalRoot with Header, Body, and Footer to create a complete Modal component
const Modal = Object.assign(ModalRoot, { Header, Body, Footer });
export default Modal; // Exporting the combined modal component for use

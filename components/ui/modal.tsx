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
  onClose: () => void;
  buttonCrossClassName?: string;
  crossClassName?: string;
};
type ModalRootProps = {
  modelContainerClassName?: string;
  backdropClassName?: string;
};

export function ModalRoot({
  children,
  isOpen,
  onOpenChange,
  scrollBehavior = "outside",
  backdrop = "transparent",
  backdropClassName,
  ...rest
}: ModalRootProps & ContentProps & UseDisclosureProps & ModalProps) {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
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
  children,

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

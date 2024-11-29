export type PaymentProps = {
  header: string;
  price: string;
};

export type ModalReturnType = {
  openModal: () => void;
};

export type PaymentPost = {
  transaction_details: TransactionDetails;
};

export type TransactionDetails = {
  gross_amount: number;
};

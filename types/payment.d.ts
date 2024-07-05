export type PaymentFormData = {
  name: string;
};

export type PaymentType = {
  id: number;
  createdAt: string;
} & PaymentFormData;

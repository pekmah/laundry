export type LaundryFormData = {
  laundry: string;
  quantity: number | string;
  unit?: string;
  id?: string;
  price?: number;
};

export type LaundryOrderFormData = {
  customer_name: string;
  customer_phone: string;
};

export enum OrderStatus {
  CREATED = "created",
  PROCESSING = "processing",
  COMPLETED = "completed",
  COLLECTED = "collected",
  CANCELLED = "cancelled",
}

export type LaundryOrderType = {
  id: number;
  customer_name: string;
  customer_phone: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  laundry: LaundryFormData[]; //json
  status: OrderStatus;
};

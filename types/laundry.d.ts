import { OrderPaymentType } from "./payment";

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
  negotiated_amount: string | number;
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
  payments?: { data: OrderPaymentType[] };
  code: string;
  negotiated_amount: number; //amount customer will pay(negotiated amount)
};

interface ILog {
  id: number;
  orderId: number;
  stage: string;
  description: string;
  createdAt: string;
}

interface ILaundryPayment {
  id: number;
  orderId: number;
  paymentMethod: string;
  amount: number;
  otherDetails: string | null;
  createdAt: Date;
}

interface ILaundryCategory {
  id: number;
  name: string;
  unit: string;
  unitPrice: number;
}

interface ILaundryItem {
  id: number;
  quantity: number;
  laundryCategory: ILaundryCategory;
}

interface IImage {
  id: number;
  orderId: number;
  url: string;
  publicId: string;
  createdAt: Date;
}

export interface ILaundryOrder {
  id: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentAmount: number;
  status: OrderStatus;
  orderNumber: string;
  createdAt: Date;
  laundryItems: ILaundryItem[];
  payments: ILaundryPayment[];
  logs: ILog[];
  images: IImage[];
}

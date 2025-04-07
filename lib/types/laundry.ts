import {
  LaundryFormData,
  LaundryOrderFormData,
  OrderStatus,
} from "types/laundry";
import { z, ZodType } from "zod";

export const LaundrySchema: ZodType<LaundryFormData> = z.object({
  laundry: z.string().min(1),
  quantity: z.string().min(1),
});

export const LaundryOrderSchema: ZodType<LaundryOrderFormData> = z.object({
  customer_name: z.string().min(3),
  customer_phone: z.string().min(10).max(13),
  negotiated_amount: z.string().min(1),
});

export interface ILaundryOrderReport {
  id: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentAmount: number;
  status: OrderStatus;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
export interface ILaundryOrderReportResponse {
  orders: ILaundryOrderReport[];
  totalAmount: number;
  meta: IPagination;
}

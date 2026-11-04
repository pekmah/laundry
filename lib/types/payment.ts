import { OrderPaymentFormData, PaymentFormData } from "types/payment";
import { z } from "zod";

export const PaymentSchema = z.object({
  name: z.string().min(2),
});

export const OrderPaymentSchema = z.object({
  amount: z.string().min(1),
  mode: z.string().min(1),
  other_details: z.string().nullable().default(""),
});

import { OrderPaymentFormData, PaymentFormData } from "types/payment";
import { z, ZodType } from "zod";

export const PaymentSchema: ZodType<PaymentFormData> = z.object({
  name: z.string().min(2),
});

export const OrderPaymentSchema: ZodType<OrderPaymentFormData> = z.object({
  deposit_amount: z.string().min(1),
  mode: z.string().min(1),
  other_details: z.string().nullable().default(""),
});

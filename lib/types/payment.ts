import { PaymentFormData } from "types/payment";
import { z, ZodType } from "zod";

export const PaymentSchema: ZodType<PaymentFormData> = z.object({
  name: z.string().min(2),
});

import { PricingFormData } from "types/pricing";
import { z, ZodType } from "zod";

export const PricingSchema: ZodType<PricingFormData> = z.object({
  name: z.string().min(2),
  amount: z.string().min(1),
  unit: z.string().min(1),
});

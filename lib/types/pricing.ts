import { PricingFormData } from "types/pricing";
import { z } from "zod";

export const PricingSchema = z.object({
  name: z.string().min(2),
  unitPrice: z.string().min(1),
  unit: z.string().min(1),
});

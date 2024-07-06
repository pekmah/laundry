import { LaundryFormData } from "types/laundry";
import { z, ZodType } from "zod";

export const LaundrySchema: ZodType<LaundryFormData> = z.object({
  laundry: z.string().min(1),
  quantity: z.string().min(1),
});

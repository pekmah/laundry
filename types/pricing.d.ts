export type PricingFormData = {
  name: string;
  unitPrice: number | string;
  unit: string;
};
export type PricingType = {
  id: number;
  name: string;
  unit: string;
  unitPrice: number;
  createdAt: string | null;
};

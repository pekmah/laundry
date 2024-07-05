export type PricingFormData = {
  name: string;
  amount: number;
  unit: string;
};
export type PricingType = {
  id: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
} & PricingFormData;

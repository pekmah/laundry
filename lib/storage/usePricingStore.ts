import { create } from "zustand";
import { PricingType } from "types/pricing";

interface PricingState {
  pricing: PricingType | null;
  editPricing: (pricing: PricingType) => void;
  reset: () => void;
}

export const usePricingStore = create<PricingState>((set) => ({
  pricing: null,
  editPricing: (pricing) => set(() => ({ pricing })),
  reset: () => set(() => ({ pricing: null })),
}));

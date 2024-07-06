import { create } from "zustand";
import { LaundryFormData } from "types/laundry";

interface LaundryState {
  laundry: LaundryFormData[];
  addLaundryItem: (item: LaundryFormData) => void;
  removeLaundryItem: (name: string) => void;
  reset: () => void;
}

export const useLaundryStore = create<LaundryState>((set) => ({
  laundry: [],
  addLaundryItem: (item) =>
    set((prev) => ({
      laundry: prev?.laundry?.length ? [...prev?.laundry, item] : [item],
    })),
  removeLaundryItem: (id) =>
    set((prev) => ({
      laundry: prev.laundry.filter((item) => item.id !== id),
    })),
  reset: () => set(() => ({ laundry: [] })),
}));

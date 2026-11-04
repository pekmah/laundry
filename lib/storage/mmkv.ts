import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({
  id: "zustand-storage",
});

export const ZustandStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

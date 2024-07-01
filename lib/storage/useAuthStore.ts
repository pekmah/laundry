import { UserType } from "lib/types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ZustandStorage } from "./mmkv";

interface AuthState {
  user: UserType | null;
  token: string | null;
  saveUser: (user: UserType, token: string) => void;
  removeUser: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      saveUser: (user, token) => set(() => ({ user, token })),
      removeUser: () => set(() => ({ user: null, token: null })),
    }),
    {
      name: "_state_auth", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => ZustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

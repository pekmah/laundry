import { BTDevice } from "utils/bluetooth";
import { create } from "zustand";

export interface UseBTStore {
  printer: BTDevice | null;
  // eslint-disable-next-line no-unused-vars
  setPrinter: (value: BTDevice | null) => void; // Function to set the printer device
}

export type useBTStoreHookType = {
  connectedDevice: BTDevice | null;
  handleDisconnect: () => void;
  // eslint-disable-next-line no-unused-vars
  handleConnect: (device: BTDevice) => void;
};

const useBTStore = create<UseBTStore>((set) => ({
  printer: null,
  setPrinter: (value) => set(() => ({ printer: value })),
}));

export default useBTStore;

export const useBTStoreHook = () => {
  const { printer, setPrinter } = useBTStore((state) => state);

  const handleConnect = (device: BTDevice) => {
    setPrinter(device);
  };

  const handleDisconnect = () => {
    setPrinter(null);
  };

  return {
    connectedDevice: printer,
    handleConnect,
    handleDisconnect,
  } as unknown as useBTStoreHookType;
};

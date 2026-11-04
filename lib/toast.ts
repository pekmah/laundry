import { toast } from 'tamagui/toast';

type Options = { message?: string; type?: 'success' | 'error' | 'warning' | 'info'; id?: string; duration?: number };
export function useToastController() {
  return {
    show(title: string, options: Options = {}) {
      const { message, type, ...rest } = options;
      const notify = type ? toast[type] : toast;
      return notify(title, { ...rest, description: message });
    },
    hide: () => toast.dismiss(),
  };
}

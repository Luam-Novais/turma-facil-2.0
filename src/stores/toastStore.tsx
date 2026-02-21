import { create } from 'zustand';

type Toast ={
    isVisible : boolean,
    state:  'error' | 'success' | null
    message: string
}
type ToastStore = {
  toastState: Toast
  setToast: (state: 'error' | 'success', message: string) => void;
};

export const useToastStore = create<ToastStore>((set) => {
  return {
    toastState: {
      isVisible: false,
      state: null,
      message: '',
    },
    setToast: (state, message) => {
      set(() => ({
        toastState: {
          isVisible: true,
          state: state,
          message: message,
        },
      }));
      setTimeout(() => {
        set(() => ({
          toastState: {
            isVisible: false,
            state: null,
            message: '',
          },
        }));
      }, 5000);
    },
  };
});

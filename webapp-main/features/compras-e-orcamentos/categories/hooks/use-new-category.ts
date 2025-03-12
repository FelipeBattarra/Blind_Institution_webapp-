import { create } from "zustand";

type NewCategoryState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAfterClose?: () => void; // Callback para ações após fechamento
  setOnAfterClose: (callback: () => void) => void;
};

export const useNewCategory = create<NewCategoryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => {
    set((state) => {
      if (state.onAfterClose) state.onAfterClose(); // Chama o callback, se existir
      return { isOpen: false, onAfterClose: undefined }; // Reseta o callback após uso
    });
  },
  setOnAfterClose: (callback) => set({ onAfterClose: callback }),
}));

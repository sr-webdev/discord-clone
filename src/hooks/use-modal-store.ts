import { create } from "zustand";

export type ModalType = "createServer" | "editServer" | "createChannel";

interface ModalStore {
  type: ModalType | null;
  open: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type) => set({ open: true, type }),
  onClose: () => set({ open: false, type: null }),
}));

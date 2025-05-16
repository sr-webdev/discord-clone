import { Server } from "@/generated/prisma";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "createChannel";

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  open: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  open: false,
  onOpen: (type, data = {}) => set({ open: true, type, data }),
  onClose: () => set({ open: false, type: null }),
}));

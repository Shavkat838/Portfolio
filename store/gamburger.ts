import { create } from "zustand";

type Store = {
  open:boolean;
  setOpen: (value: boolean) => void;
};

const useGamburgerStore = create<Store>((set) => ({
  open:false,
  setOpen: (value:boolean) => set(() => ({ open: value })),
}));

export default useGamburgerStore;

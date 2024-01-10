import { create } from "zustand";

interface UseSidebarProps {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}
export const useSidebar = create<UseSidebarProps>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));

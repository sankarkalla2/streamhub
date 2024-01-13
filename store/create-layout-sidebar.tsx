import { create } from "zustand";

interface UseCreatorSidebarProps {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}
export const useCreatorSidebar = create<UseCreatorSidebarProps>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));

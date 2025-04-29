import { SidebarButtonProps } from "../../types/Sidebar";

function SidebarButton({ icon, label, onClick }: SidebarButtonProps) {
  return (
    <button
      className="flex items-center gap-2 p-3 text-gray-800 hover:bg-slate-300/50 active:bg-white/70 rounded-xl transition"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

export { SidebarButton };

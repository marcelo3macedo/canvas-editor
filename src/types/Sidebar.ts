interface SidebarButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

type ModalType = 'product' | 'image' | 'text' | 'upload' | 'save' | 'ai' | null;

export type { ModalType, SidebarButtonProps };
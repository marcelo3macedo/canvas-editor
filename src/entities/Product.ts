export type ProductType = 'shirt' | 'mug';

export interface Product {
  id: string;
  name: string;
  type?: ProductType;
  image: string;
  availableColors?: string[];
  colors: { color: string; image: string }[];
}

export type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product, color: string) => void;
};
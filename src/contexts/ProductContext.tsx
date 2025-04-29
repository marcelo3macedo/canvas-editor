import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../entities/Product';
import { ProductService } from '../services/ProductService';

interface ProductContextType {
  selectedProduct: Product | null;
  selectedColor: string | null;
  productImage: string;
  selectProduct: (product: Product) => void;
  selectColor: (color: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(null);
  };

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  const productImage =
    selectedProduct?.colors.find(c => c.color === selectedColor)?.image || selectedProduct?.image || '';

  useEffect(() => {
    const initialProduct = ProductService.getAll().find(p => p.id === 'shirt');
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ selectedProduct, selectProduct, selectedColor, productImage, selectColor }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

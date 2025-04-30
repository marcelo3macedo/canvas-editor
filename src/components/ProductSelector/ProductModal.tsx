import { useState } from 'react';
import { Product, ProductModalProps } from '../../entities/Product';
import { products } from './Products';
import { useProduct } from '../../contexts/ProductContext';

export function ProductModal({ isOpen, onClose, onSelect }: ProductModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { selectProduct, selectColor } = useProduct();

  if (!isOpen) return null;

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    selectProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setSelectedColor(null);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    selectColor(color);
  };

  const abort = () => {
    handleBack();
    onClose();
  };

  const selectedColorData = selectedProduct?.colors.find(c => c.color === selectedColor);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative flex flex-col items-center">
        <button
          onClick={abort}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {!selectedProduct && (
          <>
            <h2 className="text-xl font-semibold mb-4">Selecione um Produto</h2>
            <div className="flex flex-col gap-4 w-full">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`border-2 rounded-xl p-3 flex items-center gap-4 cursor-pointer transition hover:border-blue-400 ${
                    (selectedProduct as any)?.id === product.id ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                  <span className="text-lg">{product.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedProduct && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Escolha uma Cor</h2>
            <img
              src={selectedColorData?.image || selectedProduct.image}
              alt={selectedProduct.name}
              className="w-48 h-48 object-contain mb-4"
            />

            <div className="flex gap-3 flex-wrap justify-center mb-6">
              {selectedProduct.colors.map(({ color }) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color ? 'border-blue-500 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Voltar
              </button>

              <button
                disabled={!selectedColor}
                onClick={() => {
                  if (selectedProduct && selectedColor) {
                    onSelect(selectedProduct, selectedColor);
                    onClose();
                    setSelectedProduct(null);
                    setSelectedColor(null);
                  }
                }}
                className={`px-4 py-2 rounded-lg ${
                  selectedColor
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-blue-300 cursor-not-allowed'
                } text-white transition`}
              >
                Selecionar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

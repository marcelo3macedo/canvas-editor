import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { ModalType } from '../../types/Sidebar';
import { SidebarButton } from './SidebarButton';
import { sidebarButtons } from './SidebarButtons';
import { ProductModal } from '../ProductSelector/ProductModal';
import { InsertImageModal } from '../InsertImageModal';
import { InsertTextModal } from '../InsertTextModal';
import { UploadImageModal } from '../UploadImageModal';
import { SaveArtModal } from '../SaveArtModal';
import { useTextContext } from '../../contexts/TextContext';
import { useImageContext } from '../../contexts/ImageContext';
import { useCanvasContext } from '../../contexts/CanvasContext';
import { AiImageModal } from '../AIImageModal/AIImageModal';

function Sidebar() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ productId: string; color: string } | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { addText } = useTextContext();
  const { addImage } = useImageContext();
  const { stageRef, transformerRef } = useCanvasContext();
  const [exportedImage, setExportedImage] = useState('');

  const handleSave = () => {
    if (stageRef.current) {
      transformerRef.current?.nodes([]);
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'artwork.png';
      link.href = uri;
      link.click();
    }
  };

  const validate = (modal: ModalType) => {
    setSidebarOpen(false);
    
    if (modal === 'save' && stageRef.current) {
      transformerRef.current?.nodes([]);
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      setExportedImage(uri);
    }
  }

  return (
    <div>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/50 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white/70 active:scale-95 transition"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>

      <div
        className={`
          ${isSidebarOpen ? 'translate-x-0 mt-16 ml-4' : 'mt-16 ml-0 -translate-x-full'} 
          md:translate-x-0
          fixed md:static top-0 left-0 
          w-64 p-5
          bg-slate-100/80 backdrop-blur-md
          border border-slate-300/40
          rounded-2xl
          flex flex-col gap-4
          md:mt-0 md:ml-0
          transition-transform duration-300 ease-in-out
          z-50
        `}
      >
        {sidebarButtons.map((button, index) => (
            <SidebarButton
              key={index}
              icon={button.icon}
              label={button.label}
              onClick={
                  () => {
                    setOpenModal(button.modal)
                    validate(button.modal)
                  }
              }
            />
        ))}
      </div>

      <ProductModal
        isOpen={openModal === 'product'}
        onClose={() => setOpenModal(null)}
        onSelect={(product, color) => {
          setSelectedProduct({ productId: product.id, color });
        }}
      />

      <InsertImageModal
        isOpen={openModal === 'image'}
        onClose={() => setOpenModal(null)}
        onSelect={(data) => { addImage(data.url) }}
      />

      <InsertTextModal
        isOpen={openModal === 'text'}
        onClose={() => setOpenModal(null)}
        onInsert={(data) => { addText(data) }}
      />

      <UploadImageModal
        isOpen={openModal === 'upload'}
        onClose={() => setOpenModal(null)}
        onUpload={(file) => { addImage(URL.createObjectURL(file)) }}
      />

      <AiImageModal
        isOpen={openModal === 'ai'}
        onClose={() => setOpenModal(null)}
        onSelect={(url) => {
          addImage(url);
        }}
      />

      <SaveArtModal
        isOpen={openModal === 'save'}
        productName={selectedProduct?.productId || ''}
        selectedColor={selectedProduct?.color || ''}
        artImage={exportedImage}
        onClose={() => setOpenModal(null)}
        onSave={handleSave}
      />

    </div>
  );
}

export { Sidebar };
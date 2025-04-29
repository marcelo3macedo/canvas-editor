import { useState, ChangeEvent } from 'react';

type UploadImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageFile: File) => void;
};

export function UploadImageModal({ isOpen, onClose, onUpload }: UploadImageModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">Upload de Imagem</h2>

        {/* Upload Section */}
        {!imagePreview ? (
          <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-gray-300 rounded-lg p-6 mb-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer transition"
            >
              Escolher Imagem
            </label>
            <p className="text-gray-500 text-sm">Formatos suportados: PNG, JPG, etc.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 object-contain rounded-lg shadow"
            />
            <div className="flex gap-4">
              <button
                onClick={handleCancelImage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (imageFile) {
                    onUpload(imageFile);
                    onClose();
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type SaveArtModalProps = {
  isOpen: boolean;
  onClose: () => void;
  artImage: string; // URL or base64
  productName: string;
  selectedColor: string; // Hex color code like "#ffffff"
  onSave: () => void;
};

export function SaveArtModal({
  isOpen,
  onClose,
  artImage,
  productName,
  selectedColor,
  onSave,
}: SaveArtModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-6">Salvar Arte</h2>

        {/* Art Preview */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={artImage}
            alt="Arte gerada"
            className="max-h-64 object-contain rounded-lg border shadow"
          />

          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-gray-700 text-sm">Produto:</p>
              <p className="font-medium">{productName}</p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: selectedColor }}
              />
              <p className="text-gray-700 text-sm">{selectedColor}</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => {
            onSave();
            onClose();
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
        >
          Salvar Arte
        </button>
      </div>
    </div>
  );
}

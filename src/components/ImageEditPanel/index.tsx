type ImageEditModalProps = {
    onClose: () => void;
    onDelete: () => void;
};

export function ImageEditPanel({ onClose, onDelete }: ImageEditModalProps) {
    return (
      <div className="fixed right-4 bottom-0 bg-white p-4 rounded shadow-md md:w-64 z-50
                      md:right-4 md:bottom-0 
                      sm:w-full sm:bottom-0 sm:top-auto sm:left-0 sm:right-0 sm:rounded-none sm:border-t">
        <div className="flex flex-col gap-2 w-80 mx-auto">
          <h2 className="text-lg font-semibold mb-2">Edit Image</h2>
          <p className="text-sm text-gray-700 mb-4">Do you want to remove this image?</p>
  
          <div className="flex justify-between items-center mt-2">
            <button onClick={onDelete} className="text-red-500 text-sm">Remove</button>
            <div className="flex gap-2">
              <button onClick={onClose} className="text-gray-500 text-sm">Cancel</button>
              <button onClick={onDelete} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
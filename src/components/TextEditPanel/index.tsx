import { useState } from 'react';

type TextEditPanelProps = {
    text: any;
    onChange: (updates: Partial<any>) => void;
    onClose: () => void;
    onDelete: () => void; // novo
};

export function TextEditPanel({ text, onChange, onClose, onDelete }: TextEditPanelProps) {
  const [localText, setLocalText] = useState(text.text);
  const [fill, setFill] = useState(text.textColor || '#000000');
  const [bg, setBg] = useState(text.backgroundColor || '');
  const [align, setAlign] = useState(text.textAlign || 'left');

  const handleConfirm = () => {
    onChange({
      text: localText,
      textColor: fill,
      backgroundColor: bg,
      textAlign: align,
    });
    onClose();
  };

  return (
    <div className="fixed right-4 bottom-0 bg-white p-4 rounded shadow-md w-64 z-50
                    md:right-4 md:bottom-0 
                    sm:w-full sm:bottom-0 sm:top-auto sm:left-0 sm:right-0 sm:rounded-none sm:border-t">
      <div className="flex flex-col gap-2 w-80 mx-auto">
        <label className="text-sm">Text</label>
        <input
          className="border px-2 py-1 rounded"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
        />

        <label className="text-sm">Text Color</label>
        <input
          type="color"
          value={fill}
          onChange={(e) => setFill(e.target.value)}
        />

        <label className="text-sm">Background Color</label>
        <input
          type="color"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />

        <label className="text-sm">Alignment</label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((a) => (
            <button
              key={a}
              onClick={() => setAlign(a)}
              className={`px-2 py-1 border rounded ${align === a ? 'bg-blue-500 text-white' : ''}`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button onClick={onDelete} className="text-red-500 text-sm">Remover</button>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-gray-500 text-sm">Cancelar</button>
            <button onClick={handleConfirm} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';

type InsertTextModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (textConfig: {
    text: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    textAlign: 'left' | 'center' | 'right';
  }) => void;
};

const fonts = [
  'Arial',
  'Times New Roman',
  'Verdana',
  'Courier New',
  'Georgia',
  'Roboto',
  'Poppins',
  'Lobster',
  'Montserrat',
];

export function InsertTextModal({ isOpen, onClose, onInsert }: InsertTextModalProps) {
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Poppins', 'Lobster', 'Montserrat'],
      },
    });
  }, []);

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

        <h2 className="text-2xl font-semibold mb-4">Inserir Texto</h2>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Digite seu texto..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        {/* Colors */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col items-center">
            <label className="text-sm mb-1">Cor do Texto</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm mb-1">Cor de Fundo</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-10 h-10 p-0 border-0"
            />
          </div>
        </div>

        {/* Font and Styles */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Font Family */}
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

          {/* Font Size */}
          <input
            type="number"
            min="8"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Tamanho da Fonte"
          />

          {/* Styles */}
          <div className="flex gap-2">
            <button
              onClick={() => setBold((prev) => !prev)}
              className={`p-2 border rounded-lg flex-1 ${bold ? 'bg-gray-300' : ''}`}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => setItalic((prev) => !prev)}
              className={`p-2 border rounded-lg flex-1 ${italic ? 'bg-gray-300' : ''}`}
            >
              <i>I</i>
            </button>
            <button
              onClick={() => setUnderline((prev) => !prev)}
              className={`p-2 border rounded-lg flex-1 ${underline ? 'bg-gray-300' : ''}`}
            >
              <u>U</u>
            </button>
          </div>

          {/* Alignment */}
          <div className="flex gap-2">
            <button
              onClick={() => setTextAlign('left')}
              className={`p-2 border rounded-lg flex-1 ${textAlign === 'left' ? 'bg-gray-300' : ''}`}
            >
              Esquerda
            </button>
            <button
              onClick={() => setTextAlign('center')}
              className={`p-2 border rounded-lg flex-1 ${textAlign === 'center' ? 'bg-gray-300' : ''}`}
            >
              Centro
            </button>
            <button
              onClick={() => setTextAlign('right')}
              className={`p-2 border rounded-lg flex-1 ${textAlign === 'right' ? 'bg-gray-300' : ''}`}
            >
              Direita
            </button>
          </div>
        </div>

        {/* Preview */}
        <div
          className="border border-dashed rounded-lg p-4 mb-4 text-center"
          style={{
            color: textColor,
            backgroundColor,
            fontFamily,
            fontSize,
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
            textAlign,
            minHeight: '80px',
          }}
        >
          {text || 'Prévia do texto...'}
        </div>

        {/* Insert Button */}
        <button
          onClick={() => {
            onInsert({
              text,
              textColor,
              backgroundColor,
              fontFamily,
              fontSize,
              bold,
              italic,
              underline,
              textAlign,
            });
            onClose();
          }}
          disabled={!text}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
        >
          Adicionar ao Canvas
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';

type AiImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
};

export function AiImageModal({ isOpen, onClose, onSelect }: AiImageModalProps) {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 360000); // 60s timeout

      const res = await fetch('https://marginally-present-salmon.ngrok-free.app/webhook/custom-gera-imagem', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error('Erro ao gerar imagem');
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
    } catch (err) {
      setError('Aplicação de Demonstração: funcionalidade offline');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPrompt('');
    setImageUrl('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={() => {
            onClose();
            reset();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">Gerar Imagem com IA</h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva a imagem desejada"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none h-24"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Gerando...' : 'Gerar Imagem'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {imageUrl && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <img src={imageUrl} alt="Gerado" className="max-h-64 object-contain rounded-lg shadow" />
            <button
              onClick={() => {
                onSelect(imageUrl);
                onClose();
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
            >
              Adicionar ao Canva
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

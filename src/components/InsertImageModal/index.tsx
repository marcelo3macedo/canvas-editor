import { useEffect, useState } from 'react';

type ImageItem = {
  id: string;
  url: string;
  category: string;
};

type InsertImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (image: ImageItem) => void;
};

// Mock Images
const allImages: ImageItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: `img-${i + 1}`,
  url: `https://picsum.photos/seed/${i + 1}/200/200`,
  category: ['Nature', 'Technology', 'Animals'][i % 3],
}));

export function InsertImageModal({ isOpen, onClose, onSelect }: InsertImageModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);

  const itemsPerPage = 20;
  const categories = ['All', 'Nature', 'Technology', 'Animals'];

  useEffect(() => {
    let images = allImages;

    if (selectedCategory && selectedCategory !== 'All') {
      images = images.filter(img => img.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      images = images.filter(img => img.id.includes(searchTerm));
    }

    setFilteredImages(images);
    setCurrentPage(1); // Reset to first page on search/filter
  }, [searchTerm, selectedCategory]);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-5xl h-[90%] overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">Selecionar Imagem</h2>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />

          <select
            value={selectedCategory || 'All'}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {paginatedImages.map(image => (
            <div
              key={image.id}
              className="border rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
              onClick={() => {
                onSelect(image);
                onClose();
              }}
            >
              <img src={image.url} alt={image.id} className="w-full h-32 object-cover" />
              <div className="p-2 text-center text-sm">{image.category}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm font-semibold">Página {currentPage}</span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage * itemsPerPage >= filteredImages.length}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

// ImageContext.tsx
import React, { createContext, useContext, useState } from 'react';

type ImageData = {
  id: string;
  src: string;
  x: number;
  y: number;
};

type ImageContextType = {
  images: ImageData[];
  addImage: (src: string) => void;
  deleteImage: (id: string) => void;
  updateImage: (id: string, updates: Partial<Omit<ImageData, 'id' | 'src'>>) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageData[]>([]);

  const addImage = (src: string) => {
    const id = crypto.randomUUID();
    setImages((prev) => [
      ...prev,
      {
        id,
        src,
        x: 0,
        y: 0,
      },
    ]);
  };

  const updateImage = (id: string, updates: Partial<Omit<ImageData, 'id' | 'src'>>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    );
  };

  const deleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <ImageContext.Provider value={{ images, addImage, updateImage, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) throw new Error('useImageContext must be used within ImageProvider');
  return ctx;
};

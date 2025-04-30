import React from 'react';
import { ProductProvider } from './contexts/ProductContext';
import { TextProvider } from './contexts/TextContext';
import { ImageProvider } from './contexts/ImageContext';
import { CanvasProvider } from './contexts/CanvasContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CanvasProvider>
      <ImageProvider>
        <TextProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </TextProvider>
      </ImageProvider>
    </CanvasProvider>
  );
};

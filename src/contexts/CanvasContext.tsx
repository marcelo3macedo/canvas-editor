import React, { createContext, useContext, useRef } from 'react';
import type { Stage } from 'konva/lib/Stage';
import type { Transformer } from 'konva/lib/shapes/Transformer';

type CanvasContextType = {
  stageRef: React.RefObject<Stage | null>;
  transformerRef: React.RefObject<Transformer | null>;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stageRef = useRef<Stage>(null);
  const transformerRef = useRef<Transformer>(null);

  return (
    <CanvasContext.Provider value={{ stageRef, transformerRef }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error('useCanvasContext must be used within CanvasProvider');
  return ctx;
};

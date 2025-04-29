// context/TextContext.tsx
import React, { createContext, useContext, useState } from 'react';

type TextConfig = {
  id: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  textAlign: 'left' | 'center' | 'right';
  x: number;
  y: number;
};

type TextContextType = {
  texts: TextConfig[];
  addText: (config: Omit<TextConfig, 'id' | 'x' | 'y'>) => void;
  updateText: (id: string, updates: Partial<TextConfig>) => void;
  removeText: (id: string) => void;
};

const TextContext = createContext<TextContextType | undefined>(undefined);

export const TextProvider = ({ children }: { children: React.ReactNode }) => {
  const [texts, setTexts] = useState<TextConfig[]>([]);

  const addText = (config: Omit<TextConfig, 'id' | 'x' | 'y'>) => {
    const newText: TextConfig = {
      ...config,
      id: Date.now().toString(),
      x: 50,
      y: 50,
    };
    setTexts((prev) => [...prev, newText]);
  };

  const updateText = (id: string, updates: Partial<TextConfig>) => {
    setTexts((prev) =>
      prev.map((text) => (text.id === id ? { ...text, ...updates } : text))
    );
  };

  const removeText = (id: string) => {
    setTexts((prev) => prev.filter((text) => text.id !== id));
  };

  return (
    <TextContext.Provider value={{ texts, addText, updateText, removeText }}>
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) throw new Error('useTextContext must be used within TextProvider');
  return context;
};

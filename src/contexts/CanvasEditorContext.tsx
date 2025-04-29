import { createContext, useContext } from 'react';

interface CanvasEditorContextType {
  addImage: (src: string) => void;
  addText: (text: string, color: string, fontFamily: string) => void;
}

const CanvasEditorContext = createContext<CanvasEditorContextType | undefined>(undefined);

export function CanvasEditorProvider({ children }: { children: React.ReactNode }) {
  const addImage = (src: string) => {
    const event = new CustomEvent('add-image', { detail: { src } });
    window.dispatchEvent(event);
  };

  const addText = (text: string, color: string, fontFamily: string) => {
    const event = new CustomEvent('add-text', { detail: { text, color, fontFamily } });
    window.dispatchEvent(event);
  };

  return (
    <CanvasEditorContext.Provider value={{ addImage, addText }}>
      {children}
    </CanvasEditorContext.Provider>
  );
}

export function useCanvasEditor() {
  const context = useContext(CanvasEditorContext);
  if (!context) {
    throw new Error('useCanvasEditor must be used within a CanvasEditorProvider');
  }
  return context;
}

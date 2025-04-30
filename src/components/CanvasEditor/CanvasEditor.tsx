import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useProduct } from '../../contexts/ProductContext';
import { useTextContext } from '../../contexts/TextContext';
import { useImageContext } from '../../contexts/ImageContext';
import { TextEditPanel } from '../TextEditPanel';
import { ImageEditPanel } from '../ImageEditPanel';

export function CanvasEditor() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { productImage } = useProduct();
  const { texts, updateText, removeText } = useTextContext();
  const { images, deleteImage } = useImageContext();
  const [showImageEditModal, setShowImageEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItemProps | null>(null);

  const [image] = useImage(productImage, 'anonymous');
  const [canvasWidth, setCanvasWidth] = useState(500);
  const canvasHeight = 600;

  const transformerRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  const selectedText = texts.find((t) => t.id === selectedId);

  useEffect(() => {
    const updateSize = () => {
      setCanvasWidth(Math.min(window.innerWidth, 500));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [productImage]);

  useEffect(() => {
    const layer = layerRef.current;
    const stage = layer?.getStage();
    const transformer = transformerRef.current;
  
    if (!transformer) return;
  
    if (selectedId) {
      const selectedNode = stage?.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformer.nodes([selectedNode]);
      }
    } else {
      transformer.nodes([]);
    }
  
    transformer.getLayer()?.batchDraw();
  }, [selectedId]);

  let imageProps = {};
  if (image) {
    const scale = canvasWidth / image.width;
    imageProps = {
      width: canvasWidth,
      height: image.height * scale,
      x: 0,
      y: (canvasHeight - image.height * scale) / 2,
    };
  }  

  type ImageItemProps = {
    id: string;
    src: string;
    x: number;
    y: number;
  };

  function ImageItem({ src, id, x, y }: ImageItemProps) {
    const [image] = useImage(src);
    return <KonvaImage id={id} image={image} x={x} y={y} draggable onClick={() => {
      setSelectedId(id)      
      setSelectedImage({ id, src, x, y });
      setShowImageEditModal(true);
    }}
    onDelete={() => {
      setSelectedId(null);
    }} />;
  }

  return (
    <div className="flex-1 flex justify-center items-baseline">
      <Stage width={canvasWidth} height={canvasHeight} 
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage();
            const clickedOnBackground = e.target?.id() === 'background';
            if (clickedOnEmpty || clickedOnBackground) {
              setSelectedId(null);
            }
          }}>
        <Layer ref={layerRef}>
          {image && <KonvaImage id="background" image={image} {...imageProps} />}
          {texts.map((t) => (
            <Text
              key={t.id}
              id={t.id}
              text={t.text}
              x={t.x}
              y={t.y}
              fontSize={t.fontSize}
              fontFamily={t.fontFamily}
              fill={t.textColor}
              fontStyle={t.italic ? 'italic' : 'normal'}
              fontWeight={t.bold ? 'bold' : 'normal'}
              textDecoration={t.underline ? 'underline' : ''}
              align={t.textAlign}
              draggable
              onMouseDown={() => setSelectedId(t.id)}
              onClick={() => setSelectedId(t.id)}
              onDragEnd={(e) => {
                const { x, y } = e.target.position();
                updateText(t.id, { x, y });
              }}
            />
          ))}          
          {images.map((img) => (
            <ImageItem key={img.id} {...img}  />
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      {selectedText && (
        <TextEditPanel
          text={selectedText}
          onChange={(updates) => updateText(selectedText.id, updates)}
          onClose={() => setSelectedId(null)}
          onDelete={() => {
            removeText(selectedText.id);
            setSelectedId(null);
          }}
        />
      )}

      {showImageEditModal && selectedImage && (
        <ImageEditPanel
          onClose={() => setShowImageEditModal(false)}
          onDelete={() => {
            deleteImage(selectedImage.id);
            setSelectedId(null);
            setSelectedImage(null);
            setShowImageEditModal(false);
          }}
        />
      )}
    </div>
  );
}

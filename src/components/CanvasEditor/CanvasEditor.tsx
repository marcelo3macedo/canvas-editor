import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useProduct } from '../../contexts/ProductContext';
import { useTextContext } from '../../contexts/TextContext';
import { useImageContext } from '../../contexts/ImageContext';
import { TextEditPanel } from '../TextEditPanel';
import { ImageEditPanel } from '../ImageEditPanel';
import { useCanvasContext } from '../../contexts/CanvasContext';

export function CanvasEditor() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { productImage } = useProduct();
  const { stageRef, transformerRef } = useCanvasContext();
  const { texts, updateText, removeText } = useTextContext();
  const { images, deleteImage, updateImage } = useImageContext();

  const [image] = useImage(productImage, 'anonymous');
  const [canvasWidth, setCanvasWidth] = useState(500);
  const canvasHeight = 600;

  const layerRef = useRef<any>(null);

  const selectedText = texts.find((t) => t.id === selectedId);
  const selectedImage = images.find((t) => t.id === selectedId);

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
    width?: number;
    height?: number;
  };

  function ImageItem({ src, id, x, y, width, height }: ImageItemProps) {
    const [image] = useImage(src, 'anonymous');
    const shapeRef = useRef<any>(null);
    const isSelected = selectedId === id;
  
    useEffect(() => {
      if (isSelected && image && shapeRef.current && transformerRef.current) {
        transformerRef.current.nodes([shapeRef.current]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected, image]);
  
    if (!image) return null;
  
    return (
      <KonvaImage
        id={id}
        ref={shapeRef}
        image={image}
        x={x}
        y={y}
        width={width ?? image.width}
        height={height ?? image.height}
        draggable
        onMouseDown={() => {
          setSelectedId(id);
        }}
        onClick={() => {
          setSelectedId(id);
        }}
        onDragEnd={(e) => {
          const { x, y } = e.target.position();
          updateImage(id, { x, y });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
  
          node.scaleX(1);
          node.scaleY(1);
  
          updateImage(id, {
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
    );
  } 

  return (
    <div className="flex-1 flex justify-center items-baseline">
      <Stage width={canvasWidth} height={canvasHeight} 
        ref={stageRef}
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage();
            const clickedOnBackground = e.target?.id() === 'background';
            if (clickedOnEmpty || clickedOnBackground) {
              setSelectedId(null);
              transformerRef.current?.nodes([]);
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

      {selectedImage && (
        <ImageEditPanel
          onClose={() => setSelectedId(null)}
          onDelete={() => {
            if (selectedId) {
              deleteImage(selectedId);
            }
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}

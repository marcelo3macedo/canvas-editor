import { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';
import { useProduct } from '../../contexts/ProductContext';
import { useTextContext } from '../../contexts/TextContext';
import { useImageContext } from '../../contexts/ImageContext';

export function CanvasEditor() {
  const { productImage } = useProduct();
  const { texts, updateText } = useTextContext();
  const { images } = useImageContext();

  const [image] = useImage(productImage, 'anonymous');
  const [canvasWidth, setCanvasWidth] = useState(500);
  const canvasHeight = 600;

  useEffect(() => {
    const updateSize = () => {
      setCanvasWidth(Math.min(window.innerWidth, 500));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [productImage]);

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
    src: string;
    x: number;
    y: number;
  };

  function ImageItem({ src, x, y }: ImageItemProps) {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} draggable />;
  }

  return (
    <div className="flex-1 flex justify-center items-baseline">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {image && <KonvaImage image={image} {...imageProps} />}
          {texts.map((t) => (
            <Text
              key={t.id}
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
              onDragEnd={(e) => {
                const { x, y } = e.target.position();
                updateText(t.id, { x, y });
              }}
            />
          ))}          
          {images.map((img) => (
            <ImageItem key={img.id} {...img} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

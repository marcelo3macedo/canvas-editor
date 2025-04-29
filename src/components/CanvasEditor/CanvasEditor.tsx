import { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { useProduct } from '../../contexts/ProductContext';

export function CanvasEditor() {
  const { productImage } = useProduct();
  
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

  return (
    <div className="flex-1 flex justify-center items-baseline">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {image && <KonvaImage image={image} {...imageProps} />}
        </Layer>
      </Stage>
    </div>
  );
}
function setSelectedProduct(defaultProduct: any) {
  throw new Error('Function not implemented.');
}


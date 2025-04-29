import { Product } from "../../entities/Product";

export const products: Product[] = [
  {
    id: 'shirt',
    name: 'Camiseta',
    image: '/products/shirt-default.png',
    colors: [
      { color: '#000000', image: '/products/shirt-black.png' },
      { color: '#ffffff', image: '/products/shirt-white.png' },
      { color: '#ff0000', image: '/products/shirt-red.png' },
    ],
  },
  {
    id: 'babylook',
    name: 'Babylook',
    image: '/products/babylook-default.png',
    colors: [
      { color: '#000000', image: '/products/babylook-black.png' },
      { color: '#ffffff', image: '/products/babylook-white.png' },
      { color: '#ff0000', image: '/products/babylook-red.png' },
    ],
  },
];
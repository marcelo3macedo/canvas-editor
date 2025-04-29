import { Home } from './pages/Home';
import { ProductProvider } from './contexts/ProductContext';
import { TextProvider } from './contexts/TextContext';
import { ImageProvider } from './contexts/ImageContext';

function App() {
  return (
    <ImageProvider>
      <TextProvider>
        <ProductProvider>
          <Home />
        </ProductProvider>
      </TextProvider>
    </ImageProvider>
  );
}

export default App;

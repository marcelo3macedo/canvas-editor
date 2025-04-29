import { Home } from './pages/Home';
import { ProductProvider } from './contexts/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Home />
    </ProductProvider>
  );
}

export default App;

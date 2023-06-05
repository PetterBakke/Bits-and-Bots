import "../src/sass/styles.scss";
import { Routes, Route } from 'react-router-dom';
import Products from './components/products';
import Cart from "./components/cart";
import CheckOut from "./components/checkout";
import PageDetail from "./components/details";

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<PageDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;

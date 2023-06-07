import "../src/sass/styles.scss";
import { Routes, Route } from 'react-router-dom';
import Products from './components/products';
import Cart from "./components/cart";
import CheckOut from "./components/checkout";
import PageDetail from "./components/details";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<PageDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;

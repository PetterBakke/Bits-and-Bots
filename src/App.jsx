import "../src/sass/styles.scss";
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './components/products';
import Cart from "./components/cart";
import CheckOut from "./components/checkout";
import PageDetail from "./components/details";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/" />
        <Route index element={<ProtectedRoute><Login /></ProtectedRoute>} />
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

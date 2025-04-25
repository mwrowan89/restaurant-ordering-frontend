import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Cart from "./components/Cart";
import CartIcon from "./components/CartIcon";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Header />
      <div className="cart-icon-comp">
        <CartIcon />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cart"
          element={
            <div>
              <Cart />
            </div>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

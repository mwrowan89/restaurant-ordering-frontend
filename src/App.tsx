import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Cart from "./components/Cart";
import CartIcon from "./components/CartIcon";

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
        {/* <Route path="/contact" element={<div>Contact</div>} /> */}
        {/* <Route path="/menu" element={<div>Menu</div>} /> */}
        {/* <Route path="/menu/:id" element={<div>Menu Item</div>} /> */}
      </Routes>
    </CartProvider>
  );
}

export default App;

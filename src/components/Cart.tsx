import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-grid">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3 className="cart-item-title">{item.name}</h3>
            <img
              src={`src${item.imageurl}`}
              alt={item.name}
              className="cart-item-image"
            />
            <p className="cart-item-price">
              {item.quantity} x ${item.price.toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="cart-item-remove"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2 className="cart-total-title">Total:</h2>
        <span className="cart-total-amount">${getCartTotal().toFixed(2)}</span>
      </div>
      <div className="cart-action-btns">
        <button onClick={clearCart} className="cart-clear">
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="cart-checkout"
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

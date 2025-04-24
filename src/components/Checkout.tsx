import { useState } from "react";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";
import "./Checkout.css";

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(0.18);
  const [customTip, setCustomTip] = useState("");
  const [isCustomTipSelected, setIsCustomTipSelected] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTipChange = (tip: number) => {
    setSelectedTip(tip);
    setCustomTip("");
    setIsCustomTipSelected(false);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setIsCustomTipSelected(true);
      setSelectedTip(value);
      setCustomTip(e.target.value);
    }
  };

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08; // 8% tax
  const tip = isCustomTipSelected
    ? parseFloat(customTip) || 0
    : cartTotal * selectedTip;
  const grandTotal = cartTotal + tax + tip;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-details">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="item-price">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div>
            <h2 className="cart-tax">Tax (8%): ${tax.toFixed(2)}</h2>
            <div className="tip-section">
              <label>Tip:</label>
              <div className="tip-buttons">
                <button
                  className={`tip-button ${
                    selectedTip === 0.18 ? "active" : ""
                  }`}
                  onClick={() => handleTipChange(0.18)}
                >
                  18%
                </button>
                <button
                  className={`tip-button ${
                    selectedTip === 0.2 ? "active" : ""
                  }`}
                  onClick={() => handleTipChange(0.2)}
                >
                  20%
                </button>
                <button
                  className={`tip-button ${
                    selectedTip === 0.22 ? "active" : ""
                  }`}
                  onClick={() => handleTipChange(0.22)}
                >
                  22%
                </button>
                <input
                  type="number"
                  placeholder="Custom Tip $"
                  value={customTip}
                  min={0}
                  onChange={handleCustomTipChange}
                  className="custom-tip-input"
                />
              </div>
              <span className="tip-amount">(${tip.toFixed(2)})</span>
            </div>
            <h2 className="cart-total">
              Grand Total: ${grandTotal.toFixed(2)}
            </h2>
            <button onClick={handleBuyNow} className="buy-now-button">
              Buy Now
            </button>
          </div>
        </div>
      )}
      {isModalOpen && <PaymentModal onClose={closeModal} />}
    </div>
  );
};

export default Checkout;

import { useState } from "react";
import React from "react";
import "./PaymentModal.css";

interface PaymentModalProps {
  onClose: () => void;
}
interface PaymentMethod {
  userid: number;
  pan: string; //cc number
  expiryMonth: number;
  expiryYear: number;
  status: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [order, setOrder] = useState<PaymentMethod>({
    userid: 1,
    pan: "",
    expiryMonth: 0,
    expiryYear: 0,
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", order);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Enter Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="number"
              className="form-input"
              placeholder="1234 5678 9012 3456"
              name="pan"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Exp Month</label>
              <input
                type="number"
                max={12}
                min={1}
                className="form-input"
                placeholder="MM"
                name="expiryMonth"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Exp Year</label>
              <input
                type="number"
                min={0}
                className="form-input"
                placeholder="YY"
                name="expiryYear"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVV</label>
              <input
                type="text"
                className="form-input"
                placeholder="123"
                name="cvv"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

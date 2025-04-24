import React from "react";
import "./PaymentModal.css";

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment submitted!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Enter Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Expiry Date</label>
            <input
              type="text"
              className="form-input"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">CVV</label>
            <input
              type="text"
              className="form-input"
              placeholder="123"
              required
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

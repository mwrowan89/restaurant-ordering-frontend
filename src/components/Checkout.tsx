import { useState } from "react";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-right">
              Total: ${getCartTotal().toFixed(2)}
            </h2>
            <button
              onClick={handleBuyNow}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
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

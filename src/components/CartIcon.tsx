import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartIcon.css";

const CartIcon = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-icon" onClick={() => navigate("/cart")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="cart-icon-svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h14m-6-5v5m-4-5v5"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;

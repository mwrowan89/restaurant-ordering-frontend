import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <img
              src={`src${item.imageurl}`}
              alt={item.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <p className="text-gray-600">
              {item.quantity} x ${item.price.toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={clearCart}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Clear Cart
        </button>
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Total:</h2>
        <span className="text-2xl font-bold text-gray-900">
          ${getCartTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Cart;

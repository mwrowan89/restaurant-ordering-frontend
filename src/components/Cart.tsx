import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  console.log("Current cart state:", cart);

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
    </div>
  );
};

export default Cart;
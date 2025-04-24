import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./MenuList.css";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageurl: string;
  available: boolean;
}

const MenuList = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { addToCart } = useCart();

  const getMenuList = async (): Promise<MenuItem[]> => {
    try {
      const response = await axios.get<MenuItem[]>("/api/menuitems");
      return response.data;
    } catch (error) {
      console.error("Error fetching menu list:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMenuList()
      .then((data) => {
        setMenuList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    setSuccessMessage(`${item.name} has been added to the cart!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="menu-list p-4">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <h1 className="text-2xl font-bold mb-4">Menu List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuList.map((item) => (
          <div
            key={item.id}
            className="menu-item bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <img
              src={`src${item.imageurl}`}
              alt={item.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-lg font-bold">Price: ${item.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;

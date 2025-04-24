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
      id: item.id,
      description: item.description,
      category: item.category,
      available: item.available,
      imageurl: item.imageurl,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    setSuccessMessage(`${item.name} has been added to the cart!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="menu-list">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <h1 className="menu-title">Menu List</h1>
      <div className="menu-grid">
        {menuList.map((item) => (
          <div key={item.id} className="menu-item">
            <h2 className="menu-item-title">{item.name}</h2>
            <img
              src={`src${item.imageurl}`}
              alt={item.name}
              className="menu-item-image"
            />
            <p className="menu-item-description">{item.description}</p>
            <div className="menu-item-price-button">
              <p className="menu-item-price">Price: ${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="menu-item-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;

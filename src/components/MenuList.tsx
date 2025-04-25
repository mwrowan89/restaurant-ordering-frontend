import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useMenuItems } from "../context/MenuItemsContext";
import "./MenuList.css";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageurl: string;
  available: boolean;
}

const MenuList = () => {
  const { menuItems, loading, error } = useMenuItems();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { addToCart } = useCart();

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

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="menu-list">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <h1 className="menu-title">Menu List</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
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

import axios from "axios";
import { useState, useEffect } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

const MenuList: React.FC = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  const getMenuList = async (): Promise<MenuItem[]> => {
    try {
      const response = await axios.get<MenuItem[]>('/api/menuitems');
      return response.data;
    } catch (error) {
      console.error("Error fetching menu list:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMenuList()
      .then(data => {
        setMenuList(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="menu-list">
      <h1>Menu List</h1>
      {menuList.map((item) => (
        <div key={item.id} className="menu-item">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
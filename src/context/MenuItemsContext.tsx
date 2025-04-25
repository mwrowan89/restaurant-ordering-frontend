import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageurl: string;
  available: boolean;
}

interface MenuItemsContextType {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

const MenuItemsContext = createContext<MenuItemsContextType | undefined>(
  undefined
);

export const MenuItemsProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get<MenuItem[]>("/api/menuitems");
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to fetch menu items.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <MenuItemsContext.Provider value={{ menuItems, loading, error }}>
      {children}
    </MenuItemsContext.Provider>
  );
};

export const useMenuItems = () => {
  const context = useContext(MenuItemsContext);
  if (!context) {
    throw new Error("useMenuItems must be used within a MenuItemsProvider");
  }
  return context;
};

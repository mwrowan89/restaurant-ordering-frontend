export interface CartItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageurl: string;
  available: boolean;
  quantity: number;
  updateCartItemQuantity: (id: number, quantity: number) => void;
}
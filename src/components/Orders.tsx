import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Order {
  id: number;
  userid: number;
  ordertime: string;
  tax: number;
  tip: number;
  total: number;
  status: string;
}

const Orders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const userid = location.state?.userid || 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(`/api/orders`);
        setOrders(response.data);

        if (location.state?.newOrder) {
          setOrders((prevOrders) => [location.state.newOrder, ...prevOrders]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [location.state, userid]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Order Time: {new Date(order.ordertime).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <p>Tax: ${order.tax.toFixed(2)}</p>
              <p>Tip: ${order.tip.toFixed(2)}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;

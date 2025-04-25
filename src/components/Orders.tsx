import { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>("/api/orders");
        setOrders(response.data);
        setErrorMessage(null);
      } catch {
        setErrorMessage(
          "An error occurred while fetching the orders. Please try again later."
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container p-6">
      <h1 className="orders-title text-2xl font-bold mb-4">All Orders</h1>

      {errorMessage && (
        <p className="error-message text-red-500">{errorMessage}</p>
      )}

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Order ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Order Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {order.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.ordertime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;

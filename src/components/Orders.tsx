import { useState } from "react";
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
  const [orders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Order | null>(null);

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const response = await axios.get<Order>(`/api/orders/${searchId}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      setSearchResult(null);
    }
  };

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResult && (
        <div className="search-result">
          <h2>Search Result</h2>
          <p>Order ID: {searchResult.id}</p>
          <p>Order Time: {new Date(searchResult.ordertime).toLocaleString()}</p>
          <p>Status: {searchResult.status}</p>
          {/* //TODO not working */}
          {/* <p>Tax: ${searchResult.tax.toFixed(2)}</p>
          <p>Tip: ${searchResult.tip.toFixed(2)}</p> */}
          <hr />
        </div>
      )}
      {orders.length === 0 ? (
        <p></p>
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

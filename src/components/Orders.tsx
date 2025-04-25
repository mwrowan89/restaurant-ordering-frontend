import { useState } from "react";
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
  const [orders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchId) {
      setErrorMessage("Please enter a valid Order ID.");
      setSearchResult(null);
      return;
    }

    try {
      const response = await axios.get<Order>(`/api/orders/${searchId}`);
      setSearchResult(response.data);
      setErrorMessage(null);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        setErrorMessage(
          "Order not found. Please check the Order ID and try again."
        );
      } else {
        setErrorMessage(
          "An error occurred while fetching the order. Please try again later."
        );
      }
      setSearchResult(null);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {searchResult && (
        <div className="search-result">
          <h2 className="search-result-title">Search Result</h2>
          <p>
            <strong>Order ID:</strong> {searchResult.id}
          </p>
          <p>
            <strong>Order Time:</strong>{" "}
            {new Date(searchResult.ordertime).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {searchResult.status}
          </p>
          {/* Uncomment if tax and tip are working */}
          {/* <p><strong>Tax:</strong> ${searchResult.tax.toFixed(2)}</p>
          <p><strong>Tip:</strong> ${searchResult.tip.toFixed(2)}</p> */}
          <hr />
        </div>
      )}

      {orders.length === 0 ? (
        <p className="no-orders"></p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Order Time:</strong>{" "}
                {new Date(order.ordertime).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Tax:</strong> ${order.tax.toFixed(2)}
              </p>
              <p>
                <strong>Tip:</strong> ${order.tip.toFixed(2)}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;

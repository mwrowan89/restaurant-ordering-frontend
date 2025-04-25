import { useState } from "react";
import axios from "axios";
import "./Orders.css";
import { MenuItem } from "./MenuList";

interface Order {
  id: number;
  userid: number;
  ordertime: string;
  tax: number;
  tip: number;
  total: number;
  status: string;
}
interface OrderItems {
  id: number;
  orderid: number;
  itemid: number;
  price: number;
  notes: string;
  firstname: string;
}

const Orders = () => {
  const [orders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
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
      //Gets order by order ID
      const orderResponse = await axios.get<Order>(`/api/orders/${searchId}`);
      //Gets items from order by order ID
      const orderItemsResponse = await axios.get<OrderItems[]>(
        `/api/items/order/${searchId}`
      );
      //Gets menu items by item ID from order items
      const menuItemsPromises = orderItemsResponse.data.map((item) =>
        axios.get<MenuItem>(`/api/menuitems/${item.itemid}`)
      );

      const menuItemsResponses = await Promise.all(menuItemsPromises);
      const menuItemsData = menuItemsResponses.map((response) => response.data);

      setMenuItems(menuItemsData);
      setTotal(orderItemsResponse.data[0].price);
      setSearchResult(orderResponse.data);
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
          <p>
            <strong>Tax:</strong> ${searchResult.tax.toFixed(2)}
          </p>
          <p>
            <strong>Tip:</strong> ${searchResult.tip.toFixed(2)}
          </p>
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
          <hr />
          {menuItems.length > 0 && (
            <div>
              <h3 className="order-items-title">Order Items</h3>
              <ul className="order-items-list">
                {menuItems.map((item) => (
                  <li key={item.id} className="order-item">
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    {/* <img
                      className="order-item-img"
                      src={`src${item.imageurl}`}
                      alt={item.name}
                    /> */}
                    <p id="order-item-price">
                      <strong>Price:</strong> ${item.price.toFixed(2)}
                    </p>
                    {/* <p>
                      <strong>Notes:</strong> {item.notes}
                    </p> */}
                  </li>
                ))}
              </ul>
            </div>
          )}
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

import { useEffect, useState } from "react";
import "./Order.css";
import { useNavigate } from "react-router-dom";





function Order() {
  const [orders, setOrders] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
  const userId = localStorage.getItem("userId");
 
  if (!userId) {
    navigate("/login");
  }
}, []);

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  fetch(
    `https://my-business-backend-1z8e.onrender.com/orders/${userId}`
  )
    .then((res) => res.json())
    .then((data) => setOrders(data));
}, []);

  const cancelOrder = async (id) => {
    await fetch(
      `https://my-business-backend-1z8e.onrender.com/orders/${id}/cancel`,
      {
        method: "PUT",
      }
    );
    

    setOrders(
      orders.map((order) =>
        order._id === id
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  return (
    <div className="orders-page">
      <h1 className="orders-title">
        My Orders
      </h1>

      <div className="orders-grid">
        {orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>{order.productName}</h3>

            <p>
              <strong>Price:</strong> ₹{order.price}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address}
            </p>

            <p>
              <strong>Status:</strong>

              <span
                className={`status ${
                  order.status === "Cancelled"
                    ? "cancelled"
                    : "pending"
                }`}
              >
                {order.status}
              </span>
            </p>

            {(order.paymentMethod === "UPI" ||
              order.paymentMethod ===
                "Card") &&
              order.status === "Pending" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelOrder(order._id)
                  }
                >
                  Cancel Order
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
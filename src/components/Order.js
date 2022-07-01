import React, { useState, useEffect } from "react";

export default function Order({ order, products, setOrders }) {
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    products.length &&
      setCurrentProduct(
        products.find((product) => product.Stueckliste === order.Stueckliste)
      );
  }, [products]);

  const onStart = async (order) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${order.ID}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ status: "WWS02" }),
      });
      const data = await res.json();
      setOrders((prev) =>
        prev.map((order) => (order.ID === data.ID ? data : order))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    await onStart(order);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="card">
      <h3>{order.Stueckliste}</h3>
      <img
        className="small"
        src={currentProduct.Dokument1}
        alt={products.Stueckliste}
      ></img>
      <div>
        {order.Wechselstatus === "WWS01" ? (
          <button onClick={handleClick} disabled={loading}>
            Start
          </button>
        ) : (
          `Status: ${order.Wechselstatus}`
        )}
      </div>
    </div>
  );
}

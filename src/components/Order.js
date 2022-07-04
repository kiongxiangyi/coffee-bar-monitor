import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function Order({ order, products, setOrders }) {
  const [loading, setLoading] = useState(false); //for start button
  const [currentProduct, setCurrentProduct] = useState({}); //for product picture of an order

  //use picture from products table and show in orders webpage
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

        //write WSS02 status to database
        body: JSON.stringify({ status: "WWS02" }),
      });
      //?
      const data = await res.json(); //data is current order of the ID
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
    //setTimeout(() => setLoading(false), 3000); //deactivate button for 3 seconds
  };

  return (
    <div className="card">
      <h3>{order.Stueckliste}</h3>
      <h3>{order.AngelegtVon}</h3>
      {/* <h3>{new Date(order.AngelegtAm).toLocaleDateString("de-DE")}</h3> */}
      <h3>
        {new Date(order.AngelegtAm).toLocaleString(
          "de-DE",
          DateTime.DATETIME_SHORT //Luxon DateTime
        )}
      </h3>
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
        ) : order.Wechselstatus === "WWS02" ? (
          "Status: In Process"
        ) : order.Wechselstatus === "WWS03" ? (
          "Status: Finished"
        ) : order.Wechselstatus === "WWS06" ? (
          "Status: For pickup"
        ) : (
          "Status: undefined"
        )}
      </div>
    </div>
  );
}

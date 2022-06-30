import React, { useEffect, useState } from "react";
import Order from "./Order";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders") //fetch orders data from backend
      .then((res) => res.json())
      .then((results) => setOrders(results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row">
        {orders.map(
          (
            order //get each element of array products
          ) => (
            <Order key={order.ID} order={order} />
          )
        )}
      </div>
    </>
  );
};

export default OrderList;

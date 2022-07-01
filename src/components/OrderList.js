import React, { useEffect, useState } from "react";
import Order from "./Order";

const OrderList = ({ onStart, products }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      //console.log("UPDATING...");
      fetch(`${process.env.REACT_APP_API}/orders`) //fetch orders data from backend
        .then((res) => res.json())
        .then((results) => setOrders(results))
        .catch((err) => console.log(err));
    };
    getOrders();
    console.log(orders);
    //run every 5 second
    const id = setInterval(getOrders, 5000);
    return () => clearInterval(id); //??
  }, []);

  return (
    <div className="row">
      {orders.map(
        (
          order //get each element of array products
        ) => (
          <Order
            key={order.ID}
            order={order}
            onStart={onStart}
            products={products}
            setOrders={setOrders} //??
          />
        )
      )}
    </div>
  );
};

export default OrderList;

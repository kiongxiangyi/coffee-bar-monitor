import React from "react";
import Order from "./Order";

const OrderList = ({ onStart, products, orders, setOrders, filter }) => {
  return (
    <div className="row">
      {orders.length > 1 && //check if there is data in orders table
        orders
          .filter((order) => filter.includes(order.Wechselstatus)) //filter orders that include specific status by passing filter function
          .sort((a, b) => new Date(b.AngelegtAm) - new Date(a.AngelegtAm)) //sort descending
          .map(
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

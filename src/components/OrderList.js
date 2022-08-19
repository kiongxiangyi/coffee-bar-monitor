import React from "react";
import Order from "./Order";

const OrderList = ({ onStart, products, orders, setOrders, filter }) => {
  return (
    <div className="row">
      <div className="d-flex flex-wrap ">
        {orders
          .filter((order) => filter.includes(order.Wechselstatus)) //filter orders that include specific status by passing filter function
          /* .sort((a, b) => new Date(b.AngelegtAm) - new Date(a.AngelegtAm)) //sort descending */
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
    </div>
  );
};

export default OrderList;

import { useState } from "react";
import Header from "./components/Header";
import OrderList from "./components/OrderList";

function App() {
  return (
    <>
      <Header />
      <div className="row">
        <OrderList />
      </div>
    </>
  );
}

export default App;

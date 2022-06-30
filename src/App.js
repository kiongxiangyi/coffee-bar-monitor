import { useState, useEffect } from "react";
import Header from "./components/Header";
import OrderList from "./components/OrderList";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/drinks") //fetch data from backend
      .then((res) => res.json())
      .then((results) => setProducts(results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="row">
        <div className="container">
          <OrderList products={products} />
        </div>
      </div>
    </>
  );
}

export default App;

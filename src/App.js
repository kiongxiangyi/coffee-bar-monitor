import { useState, useEffect } from "react"; //import the useState hook from React
import Header from "./components/Header";
import OrderList from "./components/OrderList";

function App() {
  const [products, setProducts] = useState([]); //create state, initial value empty array
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/drinks`) //fetch data from backend
      .then((res) => res.json())
      .then((results) => setProducts(results)) //set data from database as products array
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getOrders = () => {
      fetch(`${process.env.REACT_APP_API}/orders`) //fetch orders data from backend
        .then((res) => res.json())
        .then((results) => setOrders(results))
        .catch((err) => console.log(err));
    };
    getOrders();
    //run every 5 second
    const id = setInterval(getOrders, 5000);
    return () => clearInterval(id); //??
  }, []);

  return (
    <>
      <Header text="Bestellungen" />

      <OrderList
        products={products}
        orders={orders}
        setOrders={setOrders}
        filter={["WWS01", "WWS02"]}
      />

      <Header text="Zur Abholung" />
      <OrderList
        products={products}
        orders={orders}
        setOrders={setOrders}
        filter={["WWS06"]}
      />
    </>
  );
}

export default App;

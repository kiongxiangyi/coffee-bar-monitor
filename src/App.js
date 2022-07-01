import { useState, useEffect } from "react"; //import the useState hook from React
import Header from "./components/Header";
import Header2 from "./components/Header2";
import OrderList from "./components/OrderList";

function App() {
  const [products, setProducts] = useState([]); //create state, initial value empty array

  useEffect(() => {
    fetch("http://localhost:5000/drinks") //fetch data from backend
      .then((res) => res.json())
      .then((results) => setProducts(results)) //set data from database as products array
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
      <Header2 />
    </>
  );
}

export default App;

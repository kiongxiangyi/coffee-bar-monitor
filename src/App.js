import React, { useState, useEffect } from "react"; //import the useState hook from React
import Header from "./components/Header";
import OrderList from "./components/OrderList";
import i18n from "./i18n";
import Loading from "./components/Loading";
import LocaleContext from "./LocaleContext";
import { useTranslation } from "react-i18next";
import Logo from "./components/Logo";

function App() {
  const [products, setProducts] = useState([]); //create state, initial value empty array
  const [orders, setOrders] = useState([]);

  const { t } = useTranslation();

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
    const id = setInterval(getOrders, 2000);
    return () => clearInterval(id); //??
  }, []);

  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  return (
    <>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <React.Suspense fallback={<Loading />}>
          <Logo />
          <Header text={t("orders")} />
          <OrderList
            products={products}
            orders={orders}
            setOrders={setOrders}
            filter={["WWS01", "WWS02"]}
          />
          {/* <Header text={t("ready")} />
          <OrderList
            products={products}
            orders={orders}
            setOrders={setOrders}
            filter={["WWS06"]}
          /> */}
        </React.Suspense>
      </LocaleContext.Provider>
    </>
  );
}

export default App;

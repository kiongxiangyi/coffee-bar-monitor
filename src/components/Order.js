import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

export default function Order({ order, products, setOrders }) {
  const [loading, setLoading] = useState(false); //for start button
  const [currentProduct, setCurrentProduct] = useState({}); //for product picture of an order

  const { t } = useTranslation();

  //use picture from products table and show in orders webpage
  useEffect(() => {
    products.length &&
      setCurrentProduct(
        products.find((product) => product.Stueckliste === order.Stueckliste)
      );
  }, [order.Stueckliste, products]);

  const handleClickLeft = async () => {
    currentProduct.Operation = "l";
    setLoading(true);
    await onStart(order);
    //setTimeout(() => setLoading(false), 3000); //deactivate button for 3 seconds
  };

  const handleClickRight = async () => {
    currentProduct.Operation = "r";
    setLoading(true);
    await onStart(order);
    //setTimeout(() => setLoading(false), 3000); //deactivate button for 3 seconds
  };

  const onStart = async (order) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/orders/${order.ID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          //write WSS02 status and operation for coffee left/right to database
          body: JSON.stringify({
            status: "WWS02",
            coffeeMakerDirection: currentProduct.Operation,
          }),
        }
      );
      //?
      const data = await res.json(); //data is current order of the ID
      setOrders((prev) =>
        prev.map((order) => (order.ID === data.ID ? data : order))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //change status to WWS05 if picked up
  const onPickUp = async (order) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/orders/${order.ID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ status: "WWS05" }),
        }
      );
      const data = await res.json(); //data is current order of the ID
      setOrders((prev) =>
        prev.map((order) => (order.ID === data.ID ? data : order))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPickUp = async () => {
    setLoading(true);
    await onPickUp(order);
    //setTimeout(() => setLoading(false), 3000); //deactivate button for 3 seconds
  };

  return (
    <div className="col-6 col-xs-6 col-md-3 col-lg-2">
      <div className="card">
        <div className="card-body background">
          <h3 className="card-title">{order.Stueckliste}</h3>
          <p className="card-text">
            {t("orderNumber")}: {order.Auftragsnummer}
          </p>
          <p className="card-text">
            {t("tableNumber")}: {order.Bemerkung}
          </p>
          {/* <h3>{new Date(order.AngelegtAm).toLocaleDateString("de-DE")}</h3> */}
          <p className="card-text">
            {new Date(order.AngelegtAm).toLocaleString(
              "de-DE",
              DateTime.DATETIME_SHORT //Luxon DateTime
            )}
          </p>
          <img
            className="card-img-top background"
            src={`/Kaffee_Bilder/${currentProduct.Stueckliste}.png`}
            alt={currentProduct.Stueckliste}
          ></img>
          <div className="background">
            {order.Wechselstatus === "WWS01" ? (
              <>
                <button
                  className="btn btn-lg"
                  onClick={handleClickLeft}
                  disabled={loading}
                >
                  {t("start-left")}
                </button>
                <button
                  className="btn btn-lg"
                  onClick={handleClickRight}
                  disabled={loading}
                >
                  {t("start-right")}
                </button>
              </>
            ) : order.Wechselstatus === "WWS02" ? (
              <button disabled className="btn btn-lg disabled">
                {"In Bearbeitung"}
              </button>
            ) : order.Wechselstatus === "WWS03" ? (
              "Status: Erledigt"
            ) : order.Wechselstatus === "WWS06" ? (
              <button
                className="btn btn-lg"
                onClick={handleClickPickUp}
                disabled={loading}
              >
                {t("pickup")}
              </button>
            ) : order.Wechselstatus === "WWS05" ? (
              "Status: Abgeholt"
            ) : (
              "Status: undefiniert"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

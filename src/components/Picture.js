import React, { useEffect, useState } from "react";

const Picture = ({ product }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/drinks") //fetch data from backend
      .then((res) => res.json())
      .then((results) => setProducts(results))
      .catch((err) => console.log(err));
  }, []);

  console.log(product.Dokument1);
  return "product.Dokument1";
};

export default Picture;

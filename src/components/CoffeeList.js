import React, { useState } from "react";
import "./CoffeeList.css";

export default function CoffeeList() {
  const [coffee, setCoffee] = useState([
    { id: 1, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 2, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 3, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 4, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 5, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 6, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 7, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 8, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 9, name: "Coffee", image: "./images/cappucino.avif" },
    { id: 10, name: "Coffee", image: "./images/cappucino.avif" },
  ]);

  return (
    <>
      <header>
        <h1>Bestellungen</h1>
      </header>
      <div className="coffee-container">
        {coffee.map((coffee) => (
          <div className="card" key={coffee.id}>
            <h3 className="title">{coffee.name}</h3>
            <div className="image">
              <img src={coffee.image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

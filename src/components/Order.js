import React from "react";

export default function Order({ order }) {
  return (
    <div className="card">
      <h3>{order.Stueckliste}</h3>
      <img className="small" src={""} alt={order.Stueckliste}></img>
      <div>
        <button>Start</button>
      </div>
    </div>
  );
}

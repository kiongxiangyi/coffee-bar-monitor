import React from "react";

export default function Header({ text }) {
  return (
    <header className="row2 block">
      <div>
        <h1>{text}</h1>
      </div>
    </header>
  );
}

import React from "react";

export default function Header({ text }) {
  return (
    <header className="block">
      <div>
        <h1>{text}</h1>
      </div>
    </header>
  );
}

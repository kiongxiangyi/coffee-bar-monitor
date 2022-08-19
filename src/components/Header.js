import React from "react";

export default function Header({ text }) {
  return (
    <header className="block">
      <h1>{text}</h1>
    </header>
  );
}

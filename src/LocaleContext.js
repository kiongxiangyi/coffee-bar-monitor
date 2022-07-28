import React from "react";

const defaultValue = {
  locale: "de",
  setLocale: () => {},
};

export default React.createContext(defaultValue);

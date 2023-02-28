

  import React, { createContext, useContext, useEffect, useState } from "react";

  const Crypto = createContext();
  
  const LangugeContext = ({ children }) => {
    const [langchange, setlangchange] = useState('en');
  //   const [symbol, setSymbol] = useState("$");
  //   const [currencyId, setCurrencyId] = useState('' );
  const [screenLoader, setscreenLoader] = useState('false');
  
    useEffect(() => {
      if (langchange === "hi") setlangchange("hi");
      else if (langchange === "en") setlangchange("en");
      // else if (langchange === "EUR") setSymbol("€");
    }, [langchange]);
  
    return (
      <Crypto.Provider value={{ langchange, setlangchange ,screenLoader, setscreenLoader }}>
        {children}
      </Crypto.Provider>
    );
  };
  
  export default LangugeContext;
  
  export const LangState = () => {
    return useContext(Crypto);
  };
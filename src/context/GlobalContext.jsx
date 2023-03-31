import React, { createContext } from "react";

// npm libraries
import useMatchMedia from "react-use-match-media";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // viewPorts
  const notSmallViewport = useMatchMedia("(min-width: 480px)");
  const notMediumViewport = useMatchMedia("(min-width: 768px)");

  const globalState = {
    notSmallViewport,
    notMediumViewport,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

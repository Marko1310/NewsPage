import React, { createContext } from 'react';

// npm libraries
// @ts-ignore
import useMatchMedia from 'react-use-match-media';

type GlobalContextType = {
  notSmallViewport: boolean;
  notMediumViewport: boolean;
};

// create Context
export const GlobalContext = createContext<GlobalContextType | null>(null);

// provider component
export const GlobalProvider = (props: React.PropsWithChildren<{}>) => {
  // viewPorts
  const notSmallViewport: boolean = useMatchMedia('(min-width: 480px)');
  const notMediumViewport: boolean = useMatchMedia('(min-width: 768px)');

  const globalState = {
    notSmallViewport,
    notMediumViewport,
  };

  return <GlobalContext.Provider value={globalState}>{props.children}</GlobalContext.Provider>;
};

import React, { createContext, useEffect, useState } from "react";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // states //
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [loading, setLoading] = useState(false);

  // functions //
  // change sidebar category
  const handleChangeCategory = function (category) {
    setSelectedCategory(category);
  };

  const globalState = {
    articles,
    setArticles,
    selectedCategory,
    setSelectedCategory,
    loading,
    setLoading,
    handleChangeCategory,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

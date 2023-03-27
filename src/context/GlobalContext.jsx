import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // API key
  const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";
  // states //
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [loading, setLoading] = useState(false);

  // functions //
  //   const getAllArticles = function (categorie) {
  //     const allArticles = [];
  //     axios
  //       .get(
  //         `https://newsapi.org/v2/top-headlines?country=us&category=${categorie}&apiKey=${API_KEY}`
  //       )
  //       .then((res) => {
  //         const articles = res.data.articles;
  //         articles.map((el) => {
  //           const newArticle = { ...el, category: categorie };
  //           allArticles.push(newArticle);
  //         });
  //         setArticles((current) => [...current, ...allArticles]);
  //         console.log(allArticles);
  //       });
  //   };

  const getArticlesByCategorie = function (categorie) {
    const allArticles = [];
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${categorie}&apiKey=${API_KEY}`
      )
      .then((res) => {
        const articles = res.data.articles;
        articles.map((el) => {
          const newArticle = { ...el, category: categorie };
          allArticles.push(newArticle);
        });
        setArticles(allArticles);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // axios
    //   .get(
    //     `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
    //   )
    //   .then((res) => {
    //     console.log(res.data).catch((err) => console.log(err));
    //     //     res.json();
    //     //   })
    //     //   .then((data) => {
    //     //     console.log(data);
    //   });

    getArticlesByCategorie("business");
  }, []);

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

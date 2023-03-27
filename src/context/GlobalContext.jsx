import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // API key
  //   const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";
  const API_KEY = "eef268bd2bf14a57b498ce95b413d433";
  // states //
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [numArticles, setNumArticles] = useState(18);

  // functions //
  // function to fetch by categorie:
  async function getArticlesByCategory(category) {
    const articles = [];
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    response.data.articles.map((el) => {
      const newArticle = { ...el, category: category };

      articles.push(newArticle);
    });
    return articles;
  }

  // function to fetch all articles:
  // 1. fetch articles for each category
  // 2. add a category key
  // 3. push each set of array into global array
  // 4. update state with global array
  async function getHomePageArticles() {
    const categories = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];
    const allArticles = [];
    for (const category of categories) {
      const articles = await getArticlesByCategory(category);
      allArticles.push(...articles);
    }
    return allArticles;
  }

  // function to fetch articles depending on the categorie
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

  const handleLoadMore = function () {
    setNumArticles(numArticles + 18);
  };

  //   useEffect(() => {
  //     getHomePageArticles().then((articles) => {
  //       const sortedArticles = [...articles].sort((a, b) => {
  //         const dateA = new Date(a.publishedAt);
  //         const dateB = new Date(b.publishedAt);
  //         return dateB - dateA;
  //       });
  //       setArticles(sortedArticles);
  //     });
  //   }, []);

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
    numArticles,
    handleLoadMore,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

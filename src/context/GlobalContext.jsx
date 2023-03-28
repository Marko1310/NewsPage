import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // API key
  //   const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";
  //   const API_KEY = "eef268bd2bf14a57b498ce95b413d433";
  const API_KEY = "03a53c477965493ab56337906674304e";
  // states //
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [numArticles, setNumArticles] = useState(19);
  const [input, setInput] = useState("");

  // functions //
  // function to fetch by categorie:
  async function getArticlesByCategory(category) {
    const articles = [];
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    response.data.articles.map((el) => {
      const id = uuidv4();
      const newArticle = { ...el, id: id, category: category };

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

  const handleLoadMore = function () {
    setNumArticles(numArticles + 18);
  };

  useEffect(() => {
    if (selectedCategory === "Home") {
      getHomePageArticles().then((articles) => {
        const sortedArticles = [...articles].sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA;
        });
        setArticles(sortedArticles);
      });
    }
  }, []);

  // change sidebar category and fetch category news and sort them
  const handleChangeCategory = function (category) {
    setSelectedCategory(category);
    if (category === "Favorites") {
      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      setArticles(storedArticles);
    } else if (category === "Home") {
      getHomePageArticles().then((articles) => {
        const sortedArticles = [...articles].sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA;
        });
        setArticles(sortedArticles);
      });
    } else {
      getArticlesByCategory(category).then((articles) => {
        const sortedArticles = [...articles].sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB - dateA;
        });
        setArticles(sortedArticles);
      });
    }
  };

  const handleFavorite = function (article) {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];

    if (storedArticles.length === 0) {
      localStorage.setItem("articles", JSON.stringify([article]));
    } else {
      const articleExist = storedArticles.find(
        (storedArticle) =>
          storedArticle.url === article.url &&
          storedArticle.category === article.category
      );
      if (!articleExist) {
        storedArticles.push(article);
        localStorage.setItem("articles", JSON.stringify(storedArticles));
      } else {
        const newArticleArray = storedArticles.filter(
          (el) => el.content !== articleExist.content
        );
        localStorage.setItem("articles", JSON.stringify(newArticleArray));
      }
    }
  };

  const handleSearchSumbit = function (e, input) {
    e.preventDefault();
    if (input !== "") {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredArticles(filteredArticles);
    } else {
      setFilteredArticles("");
    }
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
    handleFavorite,
    handleSearchSumbit,
    input,
    setInput,
    filteredArticles,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

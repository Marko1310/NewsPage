import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

import useMatchMedia from "react-use-match-media";

// create Context
export const GlobalContext = createContext();

// provider component
export const GlobalProvider = ({ children }) => {
  // API key
  // const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";
  // const API_KEY = "eef268bd2bf14a57b498ce95b413d433";
  // const API_KEY = "03a53c477965493ab56337906674304e";
  const API_KEY = "bde9b689a4584be0bd5757718405f691";
  // const API_KEY = "f72818b798474a18b18661aea91ec437";

  // states //
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [featuredLatest, setFeaturedLatest] = useState("featured");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // viewPorts
  const notSmallViewport = useMatchMedia("(min-width: 480px)");
  const notMediumViewport = useMatchMedia("(min-width: 768px)");

  // functions //

  useEffect(() => {
    getHomePageArticles().then((articles) => {
      const sortedArticles = [...articles].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;
      });
      setLoading(false);
      setArticles(sortedArticles);
    });
    if (notSmallViewport) setIsMenuOpen(false);
  }, [notSmallViewport]);

  // function to fetch by categorie:
  async function getArticlesByCategory(category) {
    setLoading(true);
    setInput("");
    try {
      const articlesCategory = [];
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      response.data.articles.map((el) => {
        const newArticle = { ...el, category: category };
        articlesCategory.push(newArticle);
      });
      setLoading(false);
      return articlesCategory;
    } catch (err) {
      console.log(err);
    }
  }
  // function to fetch all articles:
  // 1. fetch Top headlines
  // 2. fetch Sources
  // 3. find source in each article and coresponding source in Sources
  // 4. if thet match, add category from the source to each article, if not set to blank

  async function getHomePageArticles() {
    setLoading(true);
    setInput("");

    try {
      const responseArticles = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=40`
      );
      const allArticles = responseArticles.data.articles;
      console.log(allArticles);

      const responseSources = await axios.get(
        `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}&pageSize=100`
      );
      const allSources = responseSources.data.sources;
      console.log(allSources);

      const articlesWithCategory = [];
      allArticles.map((el) => {
        const matchingSource = allSources.find(
          (source) => source.id === el.source.id
        );
        let newArticle;
        if (matchingSource) {
          newArticle = { ...el, category: matchingSource.category };
        } else {
          newArticle = { ...el, category: "" };
        }
        articlesWithCategory.push(newArticle);
      });
      setLoading(false);
      return articlesWithCategory;
    } catch (err) {
      console.log(err);
    }
  }

  // change sidebar category and fetch category news and sort them
  const handleChangeCategory = function (category) {
    setSelectedCategory(category);
    if (isMenuOpen) setIsMenuOpen(false);

    setInput("");

    if (category === "Favorites") {
      const storedArticles =
        JSON.parse(localStorage.getItem("favoriteArticles")) || [];
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
    const storedArticles =
      JSON.parse(localStorage.getItem("favoriteArticles")) || [];

    if (storedArticles.length === 0) {
      localStorage.setItem("favoriteArticles", JSON.stringify([article]));
    } else {
      const articleExist = storedArticles.find(
        (storedArticle) =>
          storedArticle.url === article.url &&
          storedArticle.category === article.category
      );
      if (!articleExist) {
        storedArticles.push(article);
        localStorage.setItem(
          "favoriteArticles",
          JSON.stringify(storedArticles)
        );
      } else {
        const newArticleArray = storedArticles.filter(
          (el) => el.content !== articleExist.content
        );
        localStorage.setItem(
          "favoriteArticles",
          JSON.stringify(newArticleArray)
        );
      }
    }
  };

  const handleSearchSumbit = function (e, input) {
    setLoading(true);
    setIsMenuOpen(false);
    e.preventDefault();

    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
    setLoading(false);
  };

  const globalState = {
    articles,
    setArticles,
    selectedCategory,
    setSelectedCategory,
    loading,
    setLoading,
    handleChangeCategory,
    handleFavorite,
    handleSearchSumbit,
    input,
    setInput,
    filteredArticles,
    API_KEY,
    notSmallViewport,
    notMediumViewport,
    featuredLatest,
    setFeaturedLatest,
    isMenuOpen,
    setIsMenuOpen,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

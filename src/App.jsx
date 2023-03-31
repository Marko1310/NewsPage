// react
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

// css
import "./App.scss";

// context
import { GlobalContext } from "./context/GlobalContext";

// fetch calls
import newsApiServices from "./services/newsApiServices.js";
import localStorageServices from "./services/localStorageServices.js";

// components
import FeaturedLatest from "./components/FeaturedLatest/FeaturedLatest";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  // genereal state
  const { notSmallViewport } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // news state
  const [category, setCategory] = useState("Home");
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  // latest news state
  const [latestNews, setLatestNews] = useState([]);
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // state for featured/latest button
  const [featuredLatest, setFeaturedLatest] = useState("featured");

  // functions//

  // get sources
  useEffect(() => {
    newsApiServices.getSources().then((sources) => setSources(sources));
  }, []);

  // get articles
  useEffect(() => {
    if (category !== "Favorites") {
      setLoading(true);
      newsApiServices.getArticles(category, query).then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
    } else if (category === "Favorites") {
      setArticles(JSON.parse(localStorage.getItem("favoriteArticles")) || []);
    }
  }, [category, query]);

  // get latest articles
  useEffect(() => {
    newsApiServices
      .getLatestNews(pageSize, page)
      .then((latestArticles) => setLatestNews(latestArticles));
    setPage(2);
  }, []);

  // change states depending on window size
  useEffect(() => {
    if (notSmallViewport) setIsMenuOpen(false);
  }, [notSmallViewport]);

  // load more articles
  const fetchMoreData = () => {
    setTimeout(() => {
      newsApiServices
        .getLatestNews(pageSize, page)
        .then((latestArticles) => {
          setLatestNews((prevState) => [...prevState, ...latestArticles]);
        })
        .catch((err) => setError(err));
    }, 1500);
    setPage((prevState) => prevState + 1);
  };

  // // handle favorite articles
  // const handleFavorite = function (article) {
  //   const storedArticles =
  //     JSON.parse(localStorage.getItem("favoriteArticles")) || [];

  //   if (storedArticles.length === 0) {
  //     localStorage.setItem("favoriteArticles", JSON.stringify([article]));
  //   } else {
  //     const articleExist = storedArticles.find(
  //       (storedArticle) =>
  //         storedArticle.url === article.url &&
  //         storedArticle.category === article.category
  //     );
  //     if (!articleExist) {
  //       storedArticles.push(article);
  //       localStorage.setItem(
  //         "favoriteArticles",
  //         JSON.stringify(storedArticles)
  //       );
  //     } else {
  //       const newArticleArray = storedArticles.filter(
  //         (el) => el.content !== articleExist.content
  //       );
  //       localStorage.setItem(
  //         "favoriteArticles",
  //         JSON.stringify(newArticleArray)
  //       );
  //     }
  //   }
  // };

  // handle favorite articles
  const handleFavorite = function (article) {
    const storedArticles = localStorageServices.getFavorites();

    if (storedArticles.length === 0) {
      localStorageServices.setFavorite(article);
    } else {
      const articleExist = localStorageServices.isFavorite(
        storedArticles,
        article
      );
      if (!articleExist) {
        storedArticles.push(article);
        localStorageServices.setFavorite(storedArticles);
      } else {
        const newArticleArray = localStorageServices.removeFavorite(
          storedArticles,
          articleExist
        );
        localStorageServices.setFavorite(newArticleArray);
      }
    }
  };

  return (
    <div className="App">
      {isMenuOpen && (
        <Menu
          category={category}
          isMenuOpen={isMenuOpen}
          handleChangeCategory={(c) => {
            setCategory(c);
            setQuery("");
            setIsMenuOpen(false);
            setFeaturedLatest("featured");
          }}
          openCloseMenu={(prevState) => setIsMenuOpen(!prevState)}
          input={input}
          changeInput={(i) => {
            setInput(i);
          }}
          queryUpdate={(q) => {
            setQuery(q);
            setInput("");
          }}
        />
      )}
      {notSmallViewport && <Navbar />}
      <div className="main-container">
        {!isMenuOpen && (
          <Search
            isMenuOpen={isMenuOpen}
            input={input}
            changeInput={(i) => {
              setInput(i);
            }}
            openCloseMenu={(prevState) => setIsMenuOpen(!prevState)}
            queryUpdate={(q) => {
              setQuery(q);
              setInput("");
            }}
          />
        )}
        {!isMenuOpen && !notSmallViewport && (
          <FeaturedLatest
            featuredLatest={featuredLatest}
            toggleFeaturedLatest={(selectedNews) => {
              setQuery("");
              setFeaturedLatest(selectedNews);
            }}
          />
        )}
        <div className="grid-container">
          {notSmallViewport && (
            <Sidebar
              category={category}
              handleChangeCategory={(c) => {
                setQuery("");
                setCategory(c);
              }}
            />
          )}
          {loading ? (
            <div className="loading">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#1d1d1b"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              <h2 className="loading-title">Loading</h2>
            </div>
          ) : (
            !isMenuOpen && (
              <News
                articles={articles}
                sources={sources}
                category={category}
                fetchMoreData={fetchMoreData}
                latestNews={latestNews}
                error={error}
                handleFavorite={handleFavorite}
                featuredLatest={featuredLatest}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// react
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

// css
import "./App.scss";

// context
import { GlobalContext } from "./context/GlobalContext";

// fetch calls
import services from "./services/service.js";

// components
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";
import FeaturedLatest from "./components/FeaturedLatest/FeaturedLatest";
import Menu from "./components/Menu/Menu";

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

  // latest news state
  const [latestNews, setLatestNews] = useState([]);
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // functions//

  // get sources
  useEffect(() => {
    services.getSources().then((sources) => setSources(sources));
  }, []);

  // get articles
  useEffect(() => {
    if (category !== "Favorites") {
      setLoading(true);
      services.getArticles(category, query).then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
    } else if (category === "Favorites") {
      setArticles(JSON.parse(localStorage.getItem("favoriteArticles")) || []);
    }
  }, [category, query]);

  // get latest articles
  useEffect(() => {
    services
      .getLatestNews(pageSize, page)
      .then((latestArticles) => setLatestNews(latestArticles));
    setPage(2);
  }, []);

  // change states depending on window size
  useEffect(() => {
    if (notSmallViewport) setIsMenuOpen(false);
    if (notSmallViewport) setCategory("Home");
  }, [notSmallViewport]);

  // load more articles
  const fetchMoreData = () => {
    setTimeout(() => {
      services
        .getLatestNews(pageSize, page)
        .then((latestArticles) => {
          setLatestNews((prevState) => [...prevState, ...latestArticles]);
        })
        .catch((err) => setError(err));
    }, 1500);
    setPage((prevState) => prevState + 1);
  };

  // handle favorite articles
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

  return (
    <div className="App">
      {isMenuOpen && (
        <Menu
          isMenuOpen={isMenuOpen}
          category={category}
          openCloseMenu={(prevState) => setIsMenuOpen(!prevState)}
        />
      )}
      {notSmallViewport && <Navbar />}
      <div className="main-container">
        {!isMenuOpen && (
          <Search
            isMenuOpen={isMenuOpen}
            openCloseMenu={(prevState) => setIsMenuOpen(!prevState)}
            queryUpdate={(q) => {
              setQuery(q);
            }}
            query={query}
          />
        )}
        {!isMenuOpen && !notSmallViewport && <FeaturedLatest />}
        <div className="grid-container">
          {notSmallViewport && (
            <Sidebar
              category={category}
              handleChangeCategory={(c) => setCategory(c)}
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
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

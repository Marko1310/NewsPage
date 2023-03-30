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
  const { notSmallViewport, isMenuOpen } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  // news grid state
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
    setLoading(true);
    services.getArticles(category, query).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [category, query]);

  // get latest articles
  useEffect(() => {
    services
      .getLatestNews(pageSize, page)
      .then((latestArticles) => setLatestNews(latestArticles));
    setPage(2);
  }, []);

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

  return (
    <div className="App">
      {category}
      {isMenuOpen && <Menu />}
      {notSmallViewport && <Navbar />}
      <div className="main-container">
        {!isMenuOpen && (
          <Search
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
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

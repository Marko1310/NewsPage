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
  const { notSmallViewport, isMenuOpen } = useContext(GlobalContext);
  const [category, setCategory] = useState("Home");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    services.getSources().then((sources) => setSources(sources));
  }, []);

  useEffect(() => {
    setLoading(true);
    services.getArticles(category, query).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [category, query]);

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
              <News articles={articles} sources={sources} category={category} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

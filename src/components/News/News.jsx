// react
import { useContext } from "react";

// css
import "./styles/News.scss";

// components
import LatestNews from "./LatestNews.jsx";
import Article from "./Article.jsx";

//context
import { GlobalContext } from "../../context/GlobalContext";

const News = () => {
  const { articles, filteredArticles, notSmallViewport, featuredLatest } =
    useContext(GlobalContext);

  const articlesToRender = filteredArticles ? filteredArticles : articles;

  return (
    <div className="news-container">
      {notSmallViewport && <p className="news-title">News</p>}
      <div className="news-gridLayout">
        {articlesToRender.map((article) => {
          if (notSmallViewport) {
            return <Article article={article} />;
          } else if (!notSmallViewport && featuredLatest !== "featured") {
            return null;
          }
          return <Article article={article} />;
        })}
        {notSmallViewport && <LatestNews />}
        {!notSmallViewport && featuredLatest === "latest" && <LatestNews />}
      </div>
    </div>
  );
};

export default News;

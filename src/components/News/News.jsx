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
  const { articles, filteredArticles, isSMallViewport, featuredLatest } =
    useContext(GlobalContext);

  const articlesToRender = filteredArticles ? filteredArticles : articles;

  return (
    <div className="news-container">
      {isSMallViewport && <p className="news-title">News</p>}
      <div className="news-gridLayout">
        {articlesToRender.map((article) => {
          return <Article article={article} />;
        })}
        {!isSMallViewport && featuredLatest === "latest" && <LatestNews />}
      </div>
    </div>
  );
};

export default News;

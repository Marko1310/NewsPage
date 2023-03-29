import "./styles/News.scss";
// import articles from "./articles";
import LatestNews from "./LatestNews.jsx";
import Article from "./Article.jsx";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

const News = () => {
  const { articles, filteredArticles, numArticles, handleLoadMore } =
    useContext(GlobalContext);

  return (
    <div className="news-container">
      <p className="news-title">News</p>

      <div className="news-gridLayout">
        {articles.map((article) => {
          return <Article article={article} />;
        })}
        <LatestNews />
      </div>
    </div>
  );
};

export default News;

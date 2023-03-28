import "../../styles/News.css";
// import articles from "./articles";
import LatestNews from "./LatestNews.jsx";
import Article from "./Article.jsx";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

const News = () => {
  const { articles, numArticles, handleLoadMore } = useContext(GlobalContext);
  const articleSubset = articles.slice(0, numArticles);

  return (
    <div className="news-container">
      <p className="news-title">News</p>

      <div className="news-gridLayout">
        {articleSubset.map((article) => {
          return <Article article={article} />;
        })}
        <LatestNews />
      </div>
      {numArticles < articles.length && (
        <p onClick={() => handleLoadMore()} className="loadMore">
          Load more...
        </p>
      )}
    </div>
  );
};

export default News;

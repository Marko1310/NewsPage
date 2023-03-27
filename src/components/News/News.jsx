import "../../styles/News.css";
// import articles from "./articles";
import LatestNews from "./LatestNews.jsx";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

const News = () => {
  const { articles, numArticles, handleLoadMore } = useContext(GlobalContext);
  const articleSubset = articles.slice(0, numArticles);

  console.log(articles.length, numArticles);

  return (
    <div className="news-container">
      <p className="news-title">News</p>
      <div className="news-gridLayout">
        {articleSubset.map((article) => {
          return (
            <div className="article-box">
              <div className="article-image-container">
                <img className="article-image" src={article.urlToImage} />
              </div>
              <div className="article-container">
                <p className="article-category">{article.category}</p>
                <p className="article-title">{article.title}</p>
                <p className="article-author">{article.author}</p>
              </div>
            </div>
          );
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

import "./styles/News.scss";
// import articles from "./articles";
import LatestNews from "./LatestNews.jsx";
import Article from "./Article.jsx";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

const News = () => {
  const { articles, filteredArticles } = useContext(GlobalContext);

  const articlesToRender =
    filteredArticles.length > 0 ? filteredArticles : articles;

  return (
    <div className="news-container">
      <p className="news-title">News</p>

      <div className="news-gridLayout">
        {articlesToRender.map((article) => {
          return <Article article={article} />;
        })}
        <LatestNews />
      </div>
    </div>
  );
};

export default News;

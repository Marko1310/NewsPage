// react
import { useContext } from "react";

// css
import "./News.scss";

// components
import LatestNews from "./LatestNews.jsx";
import Article from "./Article.jsx";

//context
import { GlobalContext } from "../../context/GlobalContext";

const News = ({
  articles,
  sources,
  category,
  fetchMoreData,
  latestNews,
  error,
  handleFavorite,
  featuredLatest,
}) => {
  const { notSmallViewport } = useContext(GlobalContext);

  return (
    <div className="news-container">
      {notSmallViewport && <p className="news-title">News</p>}
      <div className="news-gridLayout">
        {articles?.map((article, index) => {
          if (notSmallViewport) {
            return (
              <Article
                key={index}
                article={article}
                category={category}
                sources={sources}
                handleFavorite={handleFavorite}
              />
            );
          } else if (!notSmallViewport && featuredLatest === "featured") {
            return (
              <Article
                key={index}
                article={article}
                category={category}
                sources={sources}
                handleFavorite={handleFavorite}
              />
            );
          } else if (!notSmallViewport && featuredLatest !== "featured") {
            return null;
          }
        })}
        {notSmallViewport && (
          <LatestNews
            fetchMoreData={fetchMoreData}
            latestNews={latestNews}
            error={error}
          />
        )}
        {!notSmallViewport && featuredLatest === "latest" && (
          <LatestNews
            fetchMoreData={fetchMoreData}
            latestNews={latestNews}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default News;

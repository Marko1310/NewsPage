// react
import { useContext } from "react";

// css
import "./styles/News.scss";

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
}) => {
  const { notSmallViewport, featuredLatest } = useContext(GlobalContext);

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
          } else if (!notSmallViewport && featuredLatest !== "featured") {
            return null;
          }
          return (
            <Article
              article={article}
              category={category}
              sources={sources}
              handleFavorite={handleFavorite}
            />
          );
        })}
        {notSmallViewport && (
          <LatestNews
            fetchMoreData={fetchMoreData}
            latestNews={latestNews}
            error={error}
          />
        )}
        {!notSmallViewport && featuredLatest === "latest" && <LatestNews />}
      </div>
    </div>
  );
};

export default News;

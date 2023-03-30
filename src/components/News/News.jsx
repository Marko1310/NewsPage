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
}) => {
  const { filteredArticles, notSmallViewport, featuredLatest } =
    useContext(GlobalContext);

  // const articlesToRender = filteredArticles ? filteredArticles : articles;

  return (
    <div className="news-container">
      {notSmallViewport && <p className="news-title">News</p>}
      <div className="news-gridLayout">
        {articles?.map((article) => {
          if (notSmallViewport) {
            return (
              <Article
                article={article}
                category={category}
                sources={sources}
              />
            );
          } else if (!notSmallViewport && featuredLatest !== "featured") {
            return null;
          }
          return (
            <Article article={article} category={category} sources={sources} />
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

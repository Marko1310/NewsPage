import "../../styles/News.css";
import articles from "./articles";

const News = () => {
  return (
    <div className="news-container">
      <p className="news-title">News</p>
      <div className="news-gridLayout">
        {articles.map((article) => {
          return (
            <div className="article-box">
              <img src={article.imgUrl} />
              <div className="description-container">
                <p className="description-group">{article.group}</p>
                <p className="description-title">{article.title}</p>
                <p className="description-author">{article.author}</p>
              </div>
            </div>
          );
        })}
        <div className="latestNews"></div>
      </div>
    </div>
  );
};

export default News;

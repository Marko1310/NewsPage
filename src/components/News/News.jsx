import "../../styles/News.css";
import articles from "./articles";

const News = () => {
  return (
    <div className="news-container">
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
    </div>
  );
};

export default News;

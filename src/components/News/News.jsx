import "../../styles/News.css";
import articles from "./articles";
import LatestNews from "./LatestNews.jsx";

const News = () => {
  return (
    <div className="news-container">
      <p className="news-title">News</p>
      <div className="news-gridLayout">
        {articles.map((article) => {
          return (
            <div className="article-box">
              <div className="article-image-container">
                <img className="article-image" src={article.imgUrl} />
              </div>
              <div className="article-container">
                <p className="article-category">{article.category}</p>
                <p className="article-title">{article.title}</p>
                <p className="article-author">{article.author}</p>
              </div>
            </div>
          );
        })}
        {/* <div className="latestNews"> */}
        <LatestNews />
        {/* </div> */}
      </div>
    </div>
  );
};

export default News;

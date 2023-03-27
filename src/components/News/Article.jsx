import { useState } from "react";
import "../../styles/Article.css";

const Article = ({ article }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div id={article.url} className="article-box">
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
};

export default Article;

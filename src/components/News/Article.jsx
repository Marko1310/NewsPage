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
        <div className="author-favorite">
          <p className="article-author">{article.author}</p>
          <i
            onClick={() =>
              setIsFavorite((prevState) => (prevState = !prevState))
            }
            className={isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Article;

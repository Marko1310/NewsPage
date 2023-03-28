// react
import { useContext, useEffect, useState } from "react";

// css
import "./styles/Article.scss";
import "./styles/News.scss";
import "./styles/Scroll.scss";

// context
import { GlobalContext } from "../../context/GlobalContext";

// images
import NoImage from "../../assets/images/No_Image.png";

const Article = ({ article }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { handleFavorite } = useContext(GlobalContext);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const isStoredArticle = storedArticles.find(
      (storedArticle) => storedArticle.url === article.url
    );
    if (isStoredArticle) setIsFavorite(true);
    else if (isStoredArticle === undefined) setIsFavorite(false);
  }, [article]);

  return (
    <div id={article.id} className="article-box">
      <div className="article-image-container">
        <img
          className="article-image"
          src={!article.urlToImage ? NoImage : article.urlToImage}
        />
      </div>
      <div className="article-container">
        <p className="article-category">{article.category}</p>
        <p className="article-title">{article.title}</p>
        <div className="author-favorite">
          <p className="article-author">{article.author}</p>
          <i
            onClick={() => {
              setIsFavorite((prevState) => (prevState = !prevState));
              handleFavorite(article);
            }}
            className={isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Article;

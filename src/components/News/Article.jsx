// react
import { useEffect, useState } from "react";

// css
import "./styles/Article.scss";
import "./styles/News.scss";
import "./styles/Scroll.scss";

// images
import NoImage from "../../assets/images/No_Image.png";

const Article = ({ article, sources, category, handleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedArticles =
      JSON.parse(localStorage.getItem("favoriteArticles")) || [];
    const isStoredArticle = storedArticles.find(
      (storedArticle) => storedArticle.url === article.url
    );
    if (isStoredArticle) setIsFavorite(true);
    else if (isStoredArticle === undefined) setIsFavorite(false);
  }, [article]);

  return (
    <div className="article-box">
      <div className="article-image-container">
        <img
          className="article-image"
          src={!article.urlToImage ? NoImage : article.urlToImage}
        />
      </div>
      <div className="article-container">
        <p className="article-category">
          {category === "Home"
            ? sources?.find((s) => s.id === article.source.id)?.category
            : category}
        </p>
        <p className="article-title">{article.title}</p>
        <div className="author-favorite">
          {<p className="article-author">{article.author}</p>}
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

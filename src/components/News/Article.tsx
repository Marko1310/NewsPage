// react
import React, { useEffect, useState } from 'react';

// interfaces
import { Articles, Sources } from '../../App';

// css
import './Article.scss';
import './News.scss';

// images
// @ts-ignore
import NoImage from '../../assets/images/No_Image.png';

// fetch calls
import localStorageServices from '../../services/localStorageServices.js';

interface ArticleProps {
  article: Articles;
  category: string;
  sources: Sources[];
  handleFavorite: (article: Articles) => void;
}

const Article = ({ article, category, sources, handleFavorite }: ArticleProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedArticles = localStorageServices.getFavorites();
    const isStoredArticle = localStorageServices.isFavorite(storedArticles, article);
    if (isStoredArticle) setIsFavorite(true);
    else if (isStoredArticle === undefined) setIsFavorite(false);
  }, [article]);

  return (
    <div className="article-box">
      <div className="article-image-container">
        <img className="article-image" src={!article.urlToImage ? NoImage : article.urlToImage} />
      </div>
      <div className="article-container">
        <p className="article-category">
          {category === 'Home' ? sources?.find((s: Sources) => s.id === article.source.id)?.category : category}
        </p>
        <a className="article-title" href={article.url}>
          {article.title}
        </a>
        <div className="author-favorite">
          {<p className="article-author">{article.author}</p>}
          <i
            onClick={() => {
              setIsFavorite((prevState) => (prevState = !prevState));
              handleFavorite(article);
            }}
            className={isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star'}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Article;

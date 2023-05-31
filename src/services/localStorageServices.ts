// interfaces
import { Articles } from '../App';

const getFavorites = () => {
  const favoriteString = localStorage.getItem('favoriteArticles');
  return favoriteString ? JSON.parse(favoriteString) : [];
};

const setFavorite = (article: Articles[] | Articles) => {
  if (getFavorites().length === 0) {
    localStorage.setItem('favoriteArticles', JSON.stringify([article]));
  } else {
    localStorage.setItem('favoriteArticles', JSON.stringify(article));
  }
};

const isFavorite = (storedArticles: Articles[], article: Articles) => {
  return storedArticles.find((storedArticle) => storedArticle.url === article.url);
};

const removeFavorite = (storedArticles: Articles[], articleExist: Articles) => {
  return storedArticles.filter((el) => el.content !== articleExist.content);
};

export default {
  getFavorites,
  setFavorite,
  isFavorite,
  removeFavorite,
};

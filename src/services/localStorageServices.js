const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favoriteArticles")) || [];
};

const setFavorite = (article) => {
  if (getFavorites().length === 0) {
    localStorage.setItem("favoriteArticles", JSON.stringify([article]));
  } else {
    localStorage.setItem("favoriteArticles", JSON.stringify(article));
  }
};

const isFavorite = (storedArticles, article) => {
  return storedArticles.find(
    (storedArticle) => storedArticle.url === article.url
  );
};

const removeFavorite = (storedArticles, articleExist) => {
  return storedArticles.filter((el) => el.content !== articleExist.content);
};

export default {
  getFavorites,
  setFavorite,
  isFavorite,
  removeFavorite,
};

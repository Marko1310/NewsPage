import axios from "axios";

const API_KEY = "f72818b798474a18b18661aea91ec437";

const getSources = function () {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}`
    )
    .then((data) => {
      return data.data.sources;
    });
};

const getArticles = function (category, query) {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  if (category !== "Home") {
    url += `&category=${category}`;
  }

  if (query) {
    url += `&q=${query}`;
  }
  axios.get(url).then((data) => {
    return data.data.articles;
  });
};

export default {
  getSources,
  getArticles,
};

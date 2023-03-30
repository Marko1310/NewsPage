import axios from "axios";

const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";

const getSources = function () {
  return axios
    .get(
      `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}`
    )
    .then((data) => {
      console.log(data.data.sources);
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
  return axios.get(url).then((data) => {
    return data.data.articles;
  });
};

export default {
  getSources,
  getArticles,
};

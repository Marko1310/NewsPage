import axios from "axios";

const API_KEY = "9d082cf8c343429da0f7ccde72fd72e5";

const getSources = function () {
  return axios
    .get(
      `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}`
    )
    .then((data) => {
      return data.data.sources;
    })
    .catch((err) => console.log(err));
};

const getArticles = function (category, query) {
  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=13&apiKey=${API_KEY}`;

  if (category !== "Home") {
    url += `&category=${category}`;
  }

  if (query) {
    url += `&q=${query}`;
  }
  return axios
    .get(url)
    .then((data) => {
      return data.data.articles;
    })
    .catch((err) => console.log(err));
};

const getLatestNews = function (pageSize, page) {
  return axios
    .get(
      `https://newsapi.org/v2/everything?domains=bbc.co.uk&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
    )
    .then((response) => {
      return response.data.articles;
    });
  setPage(2);
};

export default {
  getSources,
  getArticles,
  getLatestNews,
};

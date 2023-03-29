//react
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// components
import EachLatestNews from "./EachLatestNews.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

//context
import { GlobalContext } from "../../context/GlobalContext.jsx";

const LatestNews = () => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [latestNews, setLatestNews] = useState([]);
  const [error, setError] = useState(null);
  const { API_KEY } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?domains=bbc.co.uk&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
      )
      .then((response) => setLatestNews(response.data.articles));
    setPage(2);
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      axios
        .get(
          `https://newsapi.org/v2/everything?domains=bbc.co.uk&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
        )
        .then((response) => {
          setLatestNews((prevState) => [
            ...prevState,
            ...response.data.articles,
          ]);
        })
        .catch((err) => setError(err));
    }, 1500);
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className="latestNews-container">
      <div className="latest-title-container">
        <div className="circle-container">
          <div className="circle-inner"></div>
          <div className="circle-outer"></div>
        </div>
        <div className="latest-title">Latest news</div>
        <div id="scrollableDiv" className="scroll-container">
          <InfiniteScroll
            dataLength={latestNews.length}
            next={fetchMoreData}
            hasMore={!error ? true : false}
            loader={
              <h4
                style={{
                  marginLeft: "15px",
                  fontWeight: "400",
                  fontSize: "16 px",
                  lineHeight: "16px",
                  letteSpacing: "-0.0153846px",
                  color: "#1e71bb",
                }}
              >
                Loading...
              </h4>
            }
            scrollableTarget="scrollableDiv"
          >
            {latestNews.map((el, index) => (
              <EachLatestNews key={index} el={el} index={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>

      <div className="latest-footer-container">
        <p className="latest-footer-title">{`See all news >`}</p>
      </div>
    </div>
  );
};

export default LatestNews;

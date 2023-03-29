import { useContext, useEffect, useState } from "react";
import Scroll from "./Scroll.jsx";
// import latestNews from "./latestNews.js";
import EachLatestNews from "./EachLatestNews.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext.jsx";

const LatestNews = () => {
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [latestNews, setLatestNews] = useState([]);
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
    console.log(page);
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
          console.log(response.data.articles);
        });
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
            hasMore={true}
            loader={
              <h4
                style={{
                  "margin-left": "15px",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "16px",
                  letteSpacing: "-0.0153846px",
                  color: "#000000",
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

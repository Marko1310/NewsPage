import { useState } from "react";
import Scroll from "./Scroll.jsx";
import latestNews from "./latestNews.js";
import EachLatestNews from "./EachLatestNews.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const LatestNews = () => {
  const [numArticles, setNumArticles] = useState(5);

  const fetchMoreData = () => {
    setTimeout(() => {
      setNumArticles(numArticles + 5);
      console.log(numArticles);
      console.log(latestNews);
      latestNews.slice(0, numArticles);
    }, 1500);
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
            dataLength={numArticles}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {latestNews.slice(0, numArticles).map((el, index) => (
              <EachLatestNews key={index} el={el} index={index} />
            ))}
          </InfiniteScroll>
          {/* <Scroll>
            {latestNews.map((el, index) => {
              return <EachLatestNews key={index} el={el} index={index} />;
            })}
          </Scroll> */}
        </div>
      </div>

      <div className="latest-footer-container">
        <p className="latest-footer-title">{`See all news >`}</p>
      </div>
    </div>
  );
};

export default LatestNews;

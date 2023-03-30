// components
import EachLatestNews from "./EachLatestNews.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const LatestNews = ({ fetchMoreData, latestNews, error }) => {
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

import Scroll from "./Scroll.jsx";
import latestNews from "./latestNews.js";
import EachLatestNews from "./EachLatestNews.jsx";

const LatestNews = () => {
  return (
    <div className="latestNews-container">
      <div className="latest-title-container">
        <div className="circle-container">
          <div className="circle-inner"></div>
          <div className="circle-outer"></div>
        </div>
        <div className="latest-title">Latest news</div>
        <div className="scroll-container">
          <Scroll>
            {latestNews.map((el) => {
              return (
                //   <div className="latest-news-box">
                //     <p>{el.time}</p>
                //     <p>{el.title}</p>
                //   </div>
                <EachLatestNews el={el} />
              );
            })}
          </Scroll>
        </div>
      </div>

      {/* <div className="latest-footer-container"> */}
      <p className="latest-footer-title">{`See all news >`}</p>
      {/* </div> */}
    </div>
  );
};

export default LatestNews;

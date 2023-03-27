const EachLatestNews = ({ el }) => {
  return (
    <div className="latest-news-box">
      <p className="latest-news-time">{el.time}</p>
      <p className="latest-news-title">{el.title}</p>
    </div>
  );
};

export default EachLatestNews;

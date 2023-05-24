const EachLatestNews = ({ el }) => {
  const timeString = el.publishedAt.substring(11, 16);

  return (
    <div className="latest-news-box">
      <p className="latest-news-time">{timeString}</p>
      <p className="latest-news-title">{el.content}</p>
    </div>
  );
};

export default EachLatestNews;

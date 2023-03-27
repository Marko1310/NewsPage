const EachLatestNews = ({ el }) => {
  return (
    <div className="latest-news-box">
      <p>{el.time}</p>
      <p>{el.title}</p>
    </div>
  );
};

export default EachLatestNews;

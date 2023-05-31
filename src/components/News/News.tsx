// react
import React, { useContext } from 'react';

// interfaces
import { Articles, Sources } from '../../App';

// css
import './News.scss';

// components
import LatestNews from './LatestNews.jsx';
import Article from './Article.jsx';

//context
import { GlobalContext } from '../../context/GlobalContext';

interface NewsProps {
  articles: Articles[];
  sources: Sources[];
  category: string;
  fetchMoreData: () => void;
  latestNews: Articles[];
  error: Error | null;
  handleFavorite: (article: Articles) => void;
  featuredLatest: string;
}

const News = ({
  articles,
  sources,
  category,
  fetchMoreData,
  latestNews,
  error,
  handleFavorite,
  featuredLatest,
}: NewsProps) => {
  // context
  const context = useContext(GlobalContext);
  if (context === null) {
    return null;
  }
  const { notSmallViewport } = context;

  return (
    <div className="news-container">
      {notSmallViewport && <p className="news-title">News</p>}
      <div className="news-gridLayout">
        {articles?.map((article, index) => {
          if (notSmallViewport) {
            return (
              <Article
                key={index}
                article={article}
                category={category}
                sources={sources}
                handleFavorite={handleFavorite}
              />
            );
          } else if (!notSmallViewport && featuredLatest === 'featured') {
            return (
              <Article
                key={index}
                article={article}
                category={category}
                sources={sources}
                handleFavorite={handleFavorite}
              />
            );
          } else if (!notSmallViewport && featuredLatest !== 'featured') {
            return null;
          }
        })}
        {notSmallViewport && <LatestNews fetchMoreData={fetchMoreData} latestNews={latestNews} error={error} />}
        {!notSmallViewport && featuredLatest === 'latest' && (
          <LatestNews fetchMoreData={fetchMoreData} latestNews={latestNews} error={error} />
        )}
      </div>
    </div>
  );
};

export default News;

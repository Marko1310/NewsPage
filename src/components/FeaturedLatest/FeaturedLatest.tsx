//react
import React from 'react';

//css
import './FeaturedLatest.scss';

interface FeaturedLatestProps {
  featuredLatest: string;
  toggleFeaturedLatest: (variable: string) => void;
}

const FeaturedLatest = ({ featuredLatest, toggleFeaturedLatest }: FeaturedLatestProps) => {
  return (
    <div className="featuredLatest-container">
      <button
        onClick={() => {
          toggleFeaturedLatest('featured');
        }}
        className={`featuredLatest-container-button + ${featuredLatest === 'featured' ? 'featured' : ''}`}
      >
        Featured
      </button>
      <button
        onClick={() => toggleFeaturedLatest('latest')}
        className={`featuredLatest-container-button + ${featuredLatest === 'latest' ? 'latest' : ''}`}
      >
        Latest
      </button>
    </div>
  );
};

export default FeaturedLatest;

//css
import "./FeaturedLatest.scss";

const FeaturedLatest = ({ featuredLatest, toggleFeaturedLatest }) => {
  return (
    <div className="featuredLatest-container">
      <button
        onClick={() => {
          toggleFeaturedLatest("featured");
        }}
        className={`featuredLatest-container-button + ${
          featuredLatest === "featured" ? "featured" : ""
        }`}
      >
        Featured
      </button>
      <button
        onClick={() => toggleFeaturedLatest("latest")}
        className={`featuredLatest-container-button + ${
          featuredLatest === "latest" ? "latest" : ""
        }`}
      >
        Latest
      </button>
    </div>
  );
};

export default FeaturedLatest;

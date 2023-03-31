//css
import "./FeaturedLatest.scss";

//context
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const FeaturedLatest = ({ featuredLatest, toggleFeaturedLatest }) => {
  const { setFeaturedLatest } = useContext(GlobalContext);
  return (
    <div className="featuredLatest-container">
      <button
        onClick={() => toggleFeaturedLatest("featured")}
        className={`featuredLatest-container-button + ${
          featuredLatest === "featured" ? "selectedButton" : ""
        }`}
      >
        Featured
      </button>
      <button
        onClick={() => toggleFeaturedLatest("latest")}
        className={`featuredLatest-container-button + ${
          featuredLatest === "latest" ? "selectedButton" : ""
        }`}
      >
        Latest
      </button>
    </div>
  );
};

export default FeaturedLatest;

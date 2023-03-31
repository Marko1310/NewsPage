//css
import "./FeaturedLatest.scss";

//context
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const FeaturedLatest = () => {
  const { featuredLatest, setFeaturedLatest } = useContext(GlobalContext);
  return (
    <div className="featuredLatest-container">
      <button
        onClick={() => setFeaturedLatest("featured")}
        className={`featuredLatest-container-button + ${
          featuredLatest === "featured" ? "selectedButton" : ""
        }`}
      >
        Featured
      </button>
      <button
        onClick={() => setFeaturedLatest("latest")}
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

import "../../styles/Search.css";
import searchIcon from "../../assets/Search.png";

const Search = () => {
  return (
    <div className="title-container">
      <p className="title">
        <span className="title-first">My</span>News
      </p>
      <div className="search">
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search news"
          ></input>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;

// react
import { useContext, useState } from "react";

// context
import { GlobalContext } from "../../context/GlobalContext";

// css
import "./styles/Search.scss";

const Search = () => {
  const { input, setInput } = useContext(GlobalContext);
  const { handleSearchSumbit } = useContext(GlobalContext);
  return (
    <div className="titleSearch-container">
      <p className="title">
        <span>My</span>News
      </p>
      <div className="search-container">
        <form
          onSubmit={(e) => handleSearchSumbit(e, input)}
          className="search-form"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            className="search-input"
            type="text"
            placeholder="Search news"
            value={input}
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

import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "../../styles/Search.css";

const Search = () => {
  const { input, setInput } = useContext(GlobalContext);
  const { handleSearchSumbit } = useContext(GlobalContext);
  console.log(input);
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

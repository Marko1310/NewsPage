// react
import { useContext } from "react";

// context
import { GlobalContext } from "../../context/GlobalContext";

// css
import "./Search.scss";

// icons
import menuLines from "../../../public/assets/icons/Three.svg";

const Search = ({
  queryUpdate,
  isMenuOpen,
  openCloseMenu,
  input,
  changeInput,
}) => {
  const { notSmallViewport } = useContext(GlobalContext);

  return (
    <div className={`titleSearch-container ${isMenuOpen ? "menu" : ""}`}>
      <p className={`title ${isMenuOpen ? "center" : ""}`}>
        <span>My</span>News
      </p>
      {!notSmallViewport && !isMenuOpen && (
        <img
          onClick={() => openCloseMenu(isMenuOpen)}
          className="menuIcons"
          src={menuLines}
        />
      )}
      <div className={`search-container ${isMenuOpen ? "menu" : ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            queryUpdate(input);
            openCloseMenu(true);
          }}
          className="search-form"
        >
          <input
            onChange={(e) => {
              changeInput(e.target.value);
            }}
            className="search-input"
            type="text"
            placeholder="Search news"
            value={input}
          ></input>
          {notSmallViewport && (
            <button className="search-button" type="submit">
              Search
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Search;

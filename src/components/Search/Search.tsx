// react
import React, { useContext } from 'react';

// context
import { GlobalContext } from '../../context/GlobalContext';

// css
import './Search.scss';

// icons
// @ts-ignore
import menuLines from '../../../public/assets/icons/Three.svg';

interface SearhProps {
  openCloseMenu: (variable: boolean) => void;
  input: string;
  changeInput: (variable: string) => void;
  isMenuOpen: boolean;
  queryUpdate: (variable: string) => void;
}

const Search = ({ openCloseMenu, input, changeInput, isMenuOpen, queryUpdate }: SearhProps) => {
  // context
  const context = useContext(GlobalContext);
  if (context === null) {
    return null;
  }
  const { notSmallViewport } = context;

  return (
    <div className={`titleSearch-container ${isMenuOpen ? 'menu' : ''}`}>
      <p className={`title ${isMenuOpen ? 'center' : ''}`}>
        <span>My</span>News
      </p>
      {!notSmallViewport && !isMenuOpen && (
        <img onClick={() => openCloseMenu(isMenuOpen)} className="menuIcons" src={menuLines} />
      )}
      <div className={`search-container ${isMenuOpen ? 'menu' : ''}`}>
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

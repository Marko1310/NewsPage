//react
import React from 'react';

// css
import './Menu.scss';

// icons
import icons from './icons';
// @ts-ignore
import menuX from '../../../public/assets/icons/X.svg';

import Search from '../Search/Search';

interface MenuProps {
  category: string;
  isMenuOpen: boolean;
  handleChangeCategory: (variable: string) => void;
  openCloseMenu: (variable: boolean) => void;
  input: string;
  changeInput: (variable: string) => void;
  queryUpdate: (variable: string) => void;
}

const Menu = ({
  category,
  isMenuOpen,
  handleChangeCategory,
  openCloseMenu,
  input,
  changeInput,
  queryUpdate,
}: MenuProps) => {
  return (
    <div className="menu-container">
      <img onClick={() => openCloseMenu(isMenuOpen)} className="menuIcons" src={menuX} />

      <Search
        openCloseMenu={openCloseMenu}
        isMenuOpen={isMenuOpen}
        input={input}
        changeInput={changeInput}
        queryUpdate={queryUpdate}
      />
      <div className="menu-icon-container">
        {icons.map((el) => {
          return (
            <div
              onClick={() => handleChangeCategory(el.title)}
              key={el.id}
              className={`menu-icon-square ${category === el.title ? 'selected' : ''}`}
            >
              <img className={`menu-icon-image ${category === el.title ? 'red' : ''}`} src={el.imgUrl} />
              <p className={`menu-icon-title ${category === el.title ? 'redColour' : ''}`}>{el.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;

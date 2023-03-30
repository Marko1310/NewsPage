//react
import React, { useContext } from "react";

// css
import "./styles/Menu.scss";

// icons
import icons from "./icons";

// Context
import { GlobalContext } from "../../context/GlobalContext";

import Search from "../Search/Search";

const Menu = () => {
  const { selectedCategory } = useContext(GlobalContext);
  const { handleChangeCategory } = useContext(GlobalContext);

  return (
    <div className="menu-container">
      <Search />
      <div className="menu-icon-container">
        {icons.map((el) => {
          return (
            <div
              onClick={() => handleChangeCategory(el.title)}
              key={el.id}
              className={`menu-icon-square ${
                selectedCategory === el.title ? "selected" : ""
              }`}
            >
              <img
                className={`menu-icon-image ${
                  selectedCategory === el.title ? "red" : ""
                }`}
                src={el.imgUrl}
              />
              <p
                className={`menu-icon-title ${
                  selectedCategory === el.title ? "redColour" : ""
                }`}
              >
                {el.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;

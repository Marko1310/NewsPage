// css
import "./Menu.scss";

// icons
import icons from "./icons";
import menuX from "../../../public/assets/icons/X.svg";

// Context
import { GlobalContext } from "../../context/GlobalContext";

import Search from "../Search/Search";

const Menu = ({ category, isMenuOpen, openCloseMenu }) => {
  // const { selectedCategory } = useContext(GlobalContext);
  // const { handleChangeCategory } = useContext(GlobalContext);

  return (
    <div className="menu-container">
      <img
        onClick={() => openCloseMenu(isMenuOpen)}
        className="menuIcons"
        src={menuX}
      />

      <Search openCloseMenu={openCloseMenu} isMenuOpen={isMenuOpen} />
      <div className="menu-icon-container">
        {icons.map((el) => {
          return (
            <div
              onClick={() => handleChangeCategory(el.title)}
              key={el.id}
              className={`menu-icon-square ${
                category === el.title ? "selected" : ""
              }`}
            >
              <img
                className={`menu-icon-image ${
                  category === el.title ? "red" : ""
                }`}
                src={el.imgUrl}
              />
              <p
                className={`menu-icon-title ${
                  category === el.title ? "redColour" : ""
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

//react
import React, { useContext } from "react";

// css
import "./styles/Sidebar.scss";

// icons
import icons from "./icons";

// Context
import { GlobalContext } from "../../context/GlobalContext";

const Sidebar = () => {
  const { selectedCategory } = useContext(GlobalContext);
  const { handleChangeCategory } = useContext(GlobalContext);

  return (
    <div className="sidebar-container">
      {icons.map((el) => {
        return (
          <div
            onClick={() => handleChangeCategory(el.title)}
            key={el.id}
            className={`icon-square + ${
              selectedCategory === el.title ? "selected" : ""
            }`}
          >
            <img className="icon-image" src={el.imgUrl} />
            <p className="icon-title">{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;

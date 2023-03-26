import "../../styles/Sidebar.css";

import icons from "./icons";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {icons.map((el) => {
        return (
          <div key={el.id} className="icon-square selected">
            <img className="icon-image" src={el.imgUrl} />
            <p className="icon-title">{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;

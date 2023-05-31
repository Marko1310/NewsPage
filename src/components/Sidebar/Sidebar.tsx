//react
import React from 'react';

// css
import './Sidebar.scss';

// icons
import icons from './icons';

interface SidebarProps {
  category: string;
  handleChangeCategory: (variable: string) => void;
}

const Sidebar = ({ category, handleChangeCategory }: SidebarProps) => {
  return (
    <div className="sidebar-container">
      {icons.map((el) => {
        return (
          <div
            onClick={() => handleChangeCategory(el.title)}
            key={el.id}
            className={`icon-square + ${category === el.title ? 'selected' : ''}`}
          >
            <img className={`icon-image + ${category === el.title ? 'red' : ''}`} src={el.imgUrl} />
            <p className={`icon-title + ${category === el.title ? 'redColour' : ''}`}>{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;

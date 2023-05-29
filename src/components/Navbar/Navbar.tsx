//react
import React from 'react';

// css
import './Navbar.scss';

// context
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const Navbar = () => {
  // context
  const context = useContext(GlobalContext);

  if (context === null) {
    return null;
  }
  const { notMediumViewport } = context;

  return (
    <div className="navbar-container">
      <div className="navbar-text-container">
        <p className="navbar-text-left">Make MyNews your homepage</p>
        {notMediumViewport && <p className="navbar-text-center">Every day discover what's trending on the internet!</p>}
        <div className="navbar-button-container">
          <button className="navbar-button">Get</button>
          <p className="navbar-text-right">No, thanks</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// css
import "./styles/Navbar.scss";

// context
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { isMediumViewport } = useContext(GlobalContext);
  return (
    <div className="navbar-container">
      <div className="navbar-text-container">
        <p className="navbar-text-left">Make MyNews your homepage</p>
        {isMediumViewport && (
          <p className="navbar-text-center">
            Every day discover what's trending on the internet!
          </p>
        )}
        <div className="navbar-button-container">
          <button className="navbar-button">Get</button>
          <p className="navbar-text-right">No, thanks</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

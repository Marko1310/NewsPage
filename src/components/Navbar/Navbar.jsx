import "../../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-text-container">
        <p className="navbar-text-left">Make MyNews your homepage</p>
        <p className="navbar-text-center">
          Every day discover what's trending on the internet!
        </p>
        <div className="navbar-button-container">
          <button className="navbar-button">Get</button>
          <p className="navbar-text-right">No, thanks</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

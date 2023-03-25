import "../../styles/Navbar.css";
// import background from "./navbarBackground.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-text-container">
        <p>Make MyNews your homepage</p>
        <p>Every day discover what's trending on the internet!</p>
        <button>Get</button>
        <p>No, thanks</p>
      </div>
    </div>
  );
};

export default Navbar;

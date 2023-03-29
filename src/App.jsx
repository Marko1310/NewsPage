// react
import { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";

// css
import "./App.scss";

// context
import { GlobalContext } from "./context/GlobalContext";

// components
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";

function App() {
  const { loading, isMobilePhone } = useContext(GlobalContext);

  return (
    <div className="App">
      {isMobilePhone && <Navbar />}
      <div className="main-container">
        <Search />
        <div className="grid-container">
          {isMobilePhone && <Sidebar />}
          {loading ? (
            <div className="loading">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#1d1d1b"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              <h2 className="loading-title">Loading</h2>
            </div>
          ) : (
            <News />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

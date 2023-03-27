// react
import { useState, useContext } from "react";

// css
import "./App.css";

// components
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";

// Context
import { GlobalContext } from "./context/GlobalContext";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Search />
        <div className="grid-container">
          {/* <div className="sidebar"> */}
          <Sidebar />
          {/* </div> */}
          {/* <div className="news"> */}
          <News />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;

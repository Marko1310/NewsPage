import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Sidebar from "./components/Sidebar/Sidebar";
import News from "./components/News/News";

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

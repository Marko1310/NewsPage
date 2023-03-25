import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Search />
      </div>
    </div>
  );
}

export default App;

// css
import "./App.css";

// components
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
          <Sidebar />
          <News />
        </div>
      </div>
    </div>
  );
}

export default App;

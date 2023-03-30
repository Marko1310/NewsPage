// react
import React from "react";
import ReactDOM from "react-dom/client";

//components
import App from "./App";

//css
import "./index.scss";

// context
import { GlobalProvider } from "./context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);

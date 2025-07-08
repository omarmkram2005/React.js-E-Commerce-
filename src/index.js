import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Route } from "react-router-dom";
import "./Css/componants/button.css";
import "./Css/componants/alerts.css";
import "./Css/componants/loading.css";
import "./Pages/Auth/Auth.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./Css/productsDeals.css";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Route>
          <App />
        </Route>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { AuthProviderComponent } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderComponent>
  </React.StrictMode>
);

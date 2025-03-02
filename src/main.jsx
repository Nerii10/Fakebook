import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  // Zmieniamy na HashRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>  {/* Zmieniamy BrowserRouter na HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>
);

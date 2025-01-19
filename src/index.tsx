import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Home } from "./pages/home/home";

const App = () => {
  return <Home />;
};

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

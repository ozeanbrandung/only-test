import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>React</div>;
};

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/app";

import "./index.scss";

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

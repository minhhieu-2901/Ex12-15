import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportPerformanceMetrics from "./reportPerformanceMetrics";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportPerformanceMetrics(console.log);

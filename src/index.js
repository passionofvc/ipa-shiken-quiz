import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { QuizProvider } from "./contexts/QuizProvider";

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Import deps
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Import components
import App from "./App";

// Import styles
import "./styles/styles.scss";

// Find div container
const rootElement = document.getElementById("root");

// Render Bookshelf component in the DOM
render(
  <Router>
    <App />
  </Router>,
  rootElement
);

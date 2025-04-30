import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import AnimatedRoutes from "./Routes/AnimatedRoutes";
import "./App.css"

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
      
    </Router>
  );
};

export default App;

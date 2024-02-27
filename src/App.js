import React from "react";
import logo from './logo.svg';
import './App.css';
//import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Paycheck from "./pages/Paycheck";
import PaycheckBudget from "./pages/PaycheckBudget";
import ErrorPage from "./pages/ErrorPage";
import ConfigureBudget from "./pages/ConfigureBudget";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/paycheck-budget" element={<PaycheckBudget />} />
            <Route path="/configure-budget" element={<ConfigureBudget />} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          basic starting webpage for CS 3110
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

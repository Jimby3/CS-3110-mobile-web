import React from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Paycheck from "./pages/Paycheck";
import Budget from "./pages/Budget";


function App() {
  return (
    <div className="App">
      <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/budget" element={<Budget />} />
                <Route
                    path="/paycheck"
                    element={<Paycheck/>}
                />
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

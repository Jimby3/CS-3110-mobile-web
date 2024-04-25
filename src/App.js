import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { collection, getDocs, addDoc } from 'firebase/firestore'
//import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useActionData,
} from "react-router-dom";

import Home from "./pages/Home";
import Paycheck from "./pages/Paycheck";
import Budget from "./pages/Budget";
import ErrorPage from "./pages/ErrorPage";
import { db } from "./firebase-config";
import UserCreate from "./components/Crud/usercreate";
import CategoryCreate from "./components/Crud/categorycreate";
import BudgetRead from "./components/Crud/budgetread";

function App() {
  const username = "exampleUsername";
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <UserCreate></UserCreate>
      <CategoryCreate></CategoryCreate>
      <BudgetRead username={username}></BudgetRead>
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

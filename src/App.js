import React from "react";
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
import PaycheckBudget from "./pages/budget-pages/PaycheckBudget";
import ErrorPage from "./pages/ErrorPage";
import { db } from "./firebase-config";
import UserCreate from "./components/Crud/usercreate";
import CategoryCreate from "./components/Crud/categorycreate";
import BudgetRead from "./components/Crud/budgetread";
import ConfigureBudget from "./pages/budget-pages/ConfigureBudget";
import ConfigureBudgetCategory from "./pages/budget-pages/ConfigureBudgetCategory";
import SavingsGoalPage from "./pages/SavingsGoalPage";


function App() {

  const username = "exampleUsername";
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="/savings" element={<SavingsGoalPage />} />
            <Route path="/paycheck-budget" element={<PaycheckBudget />} />
            <Route path="/configure-budget" element={<ConfigureBudget/>} />
            <Route path="/configure-budget-category" element={<ConfigureBudgetCategory/>} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      {/*<UserCreate></UserCreate>*/}
      {/*<CategoryCreate></CategoryCreate>*/}
      {/*<BudgetRead username={username}></BudgetRead>*/}
      <header className="App-header">
        <p>
          basic starting webpage for CS 3110
        </p>
      </header>
    </div>
  );
}

export default App;

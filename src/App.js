import React from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Paycheck from "./pages/Paycheck";
import PaycheckBudget from "./pages/budget-pages/PaycheckBudget";
import ErrorPage from "./pages/ErrorPage";
import ConfigureBudget from "./pages/budget-pages/ConfigureBudget";
import ConfigureBudgetCategory from "./pages/budget-pages/ConfigureBudgetCategory";
import SavingsGoalPage from "./pages/SavingsGoalPage";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="/savings" element={<SavingsGoalPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/paycheck-budget" element={<PaycheckBudget />} />
            <Route path="/configure-budget" element={<ConfigureBudget/>} />
            <Route path="/configure-budget-category" element={<ConfigureBudgetCategory/>} />
            <Route path="/paycheck" element={<Paycheck />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;

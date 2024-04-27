import React from "react";
import './App.css';
import {initializeApp} from "firebase/app";


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
import {UserProvider} from "./components/UserContext";
import SignUpPage from "./pages/authPages/SignUpPage";
import LogInPage from "./pages/authPages/LogInPage";
import LogOutPage from "./pages/authPages/LogOutPage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHw8vTAWuO8bDbdiY5XcWSkNmsYv-eoKY",
    authDomain: "test-88aec.firebaseapp.com",
    projectId: "test-88aec",
    storageBucket: "test-88aec.appspot.com",
    messagingSenderId: "199913356923",
    appId: "1:199913356923:web:397e34a9b5d4d5d73eacde",
    measurementId: "G-53KLRKYKWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name)

function App() {

  // const username = "exampleUsername";
  return (
      <UserProvider>
        <div className="App">
          <Router>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/paycheck" element={<Paycheck />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/savings" element={<SavingsGoalPage />} />
                <Route path="/paycheck-budget" element={<PaycheckBudget />} />
                <Route path="/configure-budget" element={<ConfigureBudget/>} />
                <Route path="/configure-budget-category" element={<ConfigureBudgetCategory/>} />
                <Route path="/paycheck" element={<Paycheck />} />
                <Route path="/logout" element={<LogOutPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
          {/*<UserCreate></UserCreate>*/}
          {/*<CategoryCreate></CategoryCreate>*/}
          {/*<BudgetRead username={username}></BudgetRead>*/}
          <header className="App-header">
          </header>
        </div>
      </UserProvider>
  );
}

export default App;

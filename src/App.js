import React, {useEffect, useState} from "react";
import './App.css';
import {initializeApp} from "firebase/app";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Paycheck from "./pages/paycheck-pages/Paycheck";
import PaycheckConfig from "./pages/paycheck-pages/PaycheckConfig";
import PaycheckBudget from "./pages/budget-pages/PaycheckBudget";
import ErrorPage from "./pages/ErrorPage";
import ConfigureBudget from "./pages/budget-pages/ConfigureBudget";
import ConfigureBudgetCategory from "./pages/budget-pages/ConfigureBudgetCategory";
import SavingsGoalPage from "./pages/SavingsGoalPage";
import {UserProvider} from "./components/UserContext";
import SignUpPage from "./pages/authPages/SignUpPage";
import LogInPage from "./pages/authPages/LogInPage";
import LogOutPage from "./pages/authPages/LogOutPage";
import {getAuth} from "firebase/auth";


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

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
    }, []);

  // const username = "exampleUsername";
  return (
      <UserProvider>
        <div className="App">
          <Router>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/paycheck" element={<Paycheck />} />
                <Route path="/paycheck-config" element={<PaycheckConfig />} />
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
          <header className="App-header">
              {user ? <p>Logged In As: {user.email}</p> : <p>No user signed in</p>}
          </header>
        </div>
      </UserProvider>
  );
}

export default App;

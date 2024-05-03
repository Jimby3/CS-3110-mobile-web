import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import './css/styles.css';
import ReactDOM from 'react-dom/client';

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
import SavingsGoalPage from "./pages/savings-pages/SavingsGoalPage";
import {UserProvider} from "./components/UserContext";
import SignUpPage from "./pages/authPages/SignUpPage";
import LogInPage from "./pages/authPages/LogInPage";
import LogOutPage from "./pages/authPages/LogOutPage";
import {getAuth} from "firebase/auth";
import ModifyGoalPage from "./pages/savings-pages/ModifyGoalPage";
import LogOut from "./components/auth/LogOut";
import Navbar from "./components/Navbar";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwR1oqnwa_t_AkKbSnpclLPd6jrUEppLE",
    authDomain: "cs3110-74f6d.firebaseapp.com",
    databaseURL: "https://cs3110-74f6d-default-rtdb.firebaseio.com",
    projectId: "cs3110-74f6d",
    storageBucket: "cs3110-74f6d.appspot.com",
    messagingSenderId: "1050027759057",
    appId: "1:1050027759057:web:990f9fc8182d7faed4fcf0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name);

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
    }, []);

    const handleLogin = async (event) => {
        window.location = "/login";
    };

    return (
        <UserProvider>
            <Navbar />
            <div>
                <div className="button-container">
                    {user ? (
                        <LogOut />
                    ) : (
                        <button className="logInOut" onClick={handleLogin}>
                            Log In
                        </button>
                    )}
                </div>
                <div className="App">
                    <Router basename={process.env.PUBLIC_URL}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/paycheck" element={<Paycheck />} />
                            <Route path="/paycheck-config" element={<PaycheckConfig />} />
                            <Route path="/login" element={<LogInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/savings" element={<SavingsGoalPage />} />
                            <Route path="/modify-goal" element={<ModifyGoalPage />} />
                            <Route path="/paycheck-budget" element={<PaycheckBudget />} />
                            <Route path="/configure-budget" element={<ConfigureBudget />} />
                            <Route
                                path="/configure-budget-category"
                                element={<ConfigureBudgetCategory />}
                            />
                            <Route path="/logout" element={<LogOutPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Router>
                </div>
            </div>
            <header className="App-header">
                {user ? <p>Logged In As: {user.email}</p> : <p>No user signed in</p>}
            </header>
        </UserProvider>
    );
}

export default App;
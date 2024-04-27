import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import readBudget from "../components/Crud/readBudget";
import Budget from "../classes/Budget";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
    }, []);

    // made to test readBudget
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Retrieve stored budget from db
        let budgetData = await readBudget()
        console.log("budgetData in home", budgetData)
        let budget = Budget.fromJSON(budgetData)
        console.log("budget in home",budget)
    }

    return (
        <div>
            <Navbar></Navbar>
            <h1>Homepage</h1>
            <p>need to figure out what to put here</p>
            <div>
                <Link to="/paycheck">
                    <button>Paycheck Calc</button>
                </Link>
                <Link to="/paycheck-budget">
                    <button>Budget</button>
                </Link>
            </div>
            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                {user ? <p>Logged In As: {user.email}</p> : <p>No user signed in</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Home;

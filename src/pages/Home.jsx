import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
    const [user, setUser] = useState(null);
    console.log(user)

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

        // ability to test any funcs

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
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Testing Button</button>
            </form>
        </div>
    );
};

export default Home;

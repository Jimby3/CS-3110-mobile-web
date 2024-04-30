import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { getAuth } from "firebase/auth";
import updateIncome from "../components/Crud/updateIncome";
import readHours from "../components/Crud/readHours";
import readAdditionalWithholding from "../components/Crud/readAdditionalWithholding";
import readWithholding from "../components/Crud/readWithholding";
import readPayPeriods from "../components/Crud/readPayPeriods";
import readHourlyPay from "../components/Crud/readHourlyPay";
import readColoradoFML from "../components/Crud/readColoradoFML";

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

        console.log(await readHours())
        console.log(await readHourlyPay())
        console.log(await readPayPeriods())
        console.log(await readWithholding())
        console.log(await readAdditionalWithholding())
        console.log(await readColoradoFML())

        // ability to test any funcs

    }

    return (
        <div className="defaultPage">
            <h1 className="header">Homepage</h1>
            <p>need to figure out what to put here</p>
            <div>
                <Link to="/paycheck">
                    <button className="button">Paycheck Calc</button>
                </Link>
                <Link to="/paycheck-budget">
                    <button className="button">Budget</button>
                </Link>
                <Link to="/savings">
                    <button className="button">Savings Goals</button>
                </Link>
            </div>
            <div>
                <Link to="/login">
                    <button className="button">Login</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <button className="button" type="submit">Testing Button</button>
            </form>

            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {/* Column 1 content */}
                        <br></br>
                        <h2>Our App</h2>
                        <p>This is column 1 content.</p>
                    </div>
                    <div className="col-md-4">
                        {/* Column 2 content */}
                        <h2>CS 3110</h2>
                        <p>This is column 2 content.</p>
                    </div>
                    <div className="col-md-4">
                        {/* Column 3 content */}
                        <h2>About Us</h2>
                        <p>This is column 3 content.</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
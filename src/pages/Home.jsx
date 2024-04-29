import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import '../css/styles.css';

import { getAuth } from "firebase/auth";
import updateIncome from "../components/Crud/updateIncome";
import readHours from "../components/Crud/readHours";
import readAdditionalWithholding from "../components/Crud/readAdditionalWithholding";
import readWithholding from "../components/Crud/readWithholding";
import readPayPeriods from "../components/Crud/readPayPeriods";
import readHourlyPay from "../components/Crud/readHourlyPay";
import readColoradoFML from "../components/Crud/readColoradoFML";
import updateAdditionalWithholding from "../components/Crud/updateAdditionalWithholding";
import updateColoradoFML from "../components/Crud/updateColoradoFML";
import updateHourlyPay from "../components/Crud/updateHourlyPay";
import updateHours from "../components/Crud/updateHours";
import updatePayPeriods from "../components/Crud/updatePayPeriods";
import updateWithholding from "../components/Crud/updateWithholding";

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

        await updateAdditionalWithholding(1)
        await updateColoradoFML(false)
        await updateHourlyPay(2)
        await updateHours(3)
        await updateIncome(4)
        await updatePayPeriods(5)
        await updateWithholding(6)
        // ability to test any funcs

    }

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="header">Homepage</h1>
            <p>need to figure out what to put here</p>
            <div>
                <Link to="/paycheck">
                    <button className="button">Paycheck Calc</button>
                </Link>
                <Link to="/paycheck-budget">
                    <button className="button">Budget</button>
                </Link>
            </div>
            <div>
                <Link to="/login">
                    <button className="button">Login</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <button  className="button" type="submit">Testing Button</button>
            </form>
        </div>

    );
};
 
export default Home;
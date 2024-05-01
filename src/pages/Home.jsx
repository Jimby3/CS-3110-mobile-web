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
        <div className="defaultPage">
            <h1 className="header">Home</h1>
            <div>
                <Link to="/paycheck">
                    <button className="button-big">Paycheck Calc</button>
                </Link>
                <br></br>
                <Link to="/paycheck-budget">
                    <button className="button-big">Budget</button>
                </Link>
                <br></br>
                <Link to="/savings">
                    <button className="button-big">Savings Goals</button>
                </Link>
            </div>
            <br></br>
            <br></br>
            <div className="container">
                <div className="row">
                    <br></br>
                    <div className="col-md-4">
                        <h2>Our App</h2>
                        <p>Our app is a personal finance app that was designed by 3 college students for a class.
                            We utilized HTML, CSS, JavaScript, and React/Bootstrap to implement our application</p>
                    </div>
                    <div className="col-md-4">
                        <h2>CS 3110</h2>
                        <p>CS 3110 - Programming the Mobile Web is a class designated to learning programming
                            ideologies and implementations in the context of mobile devices</p>
                    </div>
                    <div className="col-md-4">
                        <h2>About us</h2>
                        <p>We are three college students who got tasked with making a mobile-first application for the
                        duration of a semester, we all came in with limited experience and ended up creating this
                            application</p>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
import React from "react";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import UserRead from "../components/Crud/UserRead";
 
const Home = () => {


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
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <UserRead userID={"testUID"}>user read</UserRead>
            </div>
        </div>

    );
};
 
export default Home;
import React from "react";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
 
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
                <Link to="/budget">
                    <button>Budget</button>
                </Link>
            </div>
        </div>

    );
};
 
export default Home;
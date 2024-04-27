import React from "react";
import Navbar from "../../components/Navbar";
import LogIn from "../../components/auth/LogIn";
import {Link} from "react-router-dom";

const LogInPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <LogIn></LogIn>
            <p>Don't Have An Account?</p>
            <Link to="/signup">
                <button>Sign-Up</button>
            </Link>
        </div>
    );
};

export default LogInPage;
import React from "react";
import Navbar from "../../components/Navbar";
import LogIn from "../../components/auth/LogIn";
import {Link} from "react-router-dom";

const LogInPage = () => {
    return (
        <div className="defaultPage">
            <LogIn></LogIn>
            <br></br>
            <br></br>
            <p>Don't Have An Account?</p>
            <Link to="/signup">
                <button className="button">Sign-Up</button>
            </Link>
        </div>
    );
};

export default LogInPage;
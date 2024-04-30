import React from "react";
import Navbar from "../../components/Navbar";
import SignUp from "../../components/auth/SignUp";
import {Link} from "react-router-dom";

const SignUpPage = () => {
    return (
        <div className="defaultPage">
            <SignUp></SignUp>
            <br></br>
            <br></br>
            <p>Already Have an Account?</p>
            <Link to="/login">
                <button className="button">Login</button>
            </Link>
        </div>
    );
};

export default SignUpPage;
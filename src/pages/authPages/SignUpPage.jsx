import React from "react";
import Navbar from "../../components/Navbar";
import SignUp from "../../components/auth/SignUp";
import {Link} from "react-router-dom";

const SignUpPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <SignUp></SignUp>
            <p>Already Have an Account?</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
};

export default SignUpPage;
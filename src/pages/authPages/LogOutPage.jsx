import React from 'react';
import LogOut from '../../components/auth/LogOut';
import Navbar from "../../components/Navbar";

const LogOutPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Are you sure you want to log out?</h1>
            <p></p>
            <LogOut />
        </div>
    );
};

export default LogOutPage;

import React from 'react';
import LogOut from '../../components/auth/LogOut';
import Navbar from "../../components/Navbar";

const LogOutPage = () => {
    return (
        <div className="defaultPage">
            <h3 className="header">Are you sure you want to log out?</h3>
            <p></p>
            <LogOut />
        </div>
    );
};

export default LogOutPage;

import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/styles.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom" aria-label="Main Navigation Menu">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CS3110</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/paycheck-budget">Budget</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/paycheck">Paycheck</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/savings">Savings Goals</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/styles.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom" aria-label="Main Navigation Menu">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">CS3110</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/paycheck-budget">Budget</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/paycheck">Paycheck</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/savings">Savings Goals</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


import React from "react";
 
const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Main Navigation Menu">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Expand at md</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/budget">Budget</a>
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


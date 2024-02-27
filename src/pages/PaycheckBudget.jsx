import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function PaycheckBudget() {
    // State to store form data
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [savings, setSavings] = useState("");

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Your logic for handling form submission (e.g., calculation)
        console.log("Form submitted:", { income, expenses, savings });
        // Add your logic here to process the form data (e.g., perform calculations)
    };

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <h1>Budget</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="income">Income:</label>
                    <input
                        type="number"
                        id="income"
                        name="income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Calculate</button>
                </div>
                <div>
                    {/* Button to navigate to "configure budget values" page */}
                    <Link to="/configure-budget" className="button">
                        Configure Budget Values
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default PaycheckBudget;

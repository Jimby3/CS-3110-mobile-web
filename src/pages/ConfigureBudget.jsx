// ConfigureBudget.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfigureBudget() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [savings, setSavings] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic for handling form submission
        console.log("PaycheckBudget values submitted:", { income, expenses, savings });
        // You can save the budget values to localStorage, send them to a server, etc.
        // Navigate back to the budget page
        navigate("/budget");
    };

    return (
        <div>
            <h1>Configure Budget Values</h1>
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
                    <label htmlFor="expenses">Expenses:</label>
                    <input
                        type="number"
                        id="expenses"
                        name="expenses"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="savings">Savings:</label>
                    <input
                        type="number"
                        id="savings"
                        name="savings"
                        value={savings}
                        onChange={(e) => setSavings(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default ConfigureBudget;

import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Budget from "../../classes/Budget";
import Chart from 'chart.js/auto';
import updateBudgetCategories from "../../components/Crud/updateBudgetCategories";
import readBudget from "../../components/Crud/readBudget";
import readIncome from "../../components/Crud/readIncome";
import { useState, useEffect } from "react";

const PaycheckBudget = () => {
    const [income, setIncome] = useState(null); // State to store the user's income
    const [budget, setBudget] = useState(null); // State to store the user's budget

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the income and budget from the database
                const userIncome = await readIncome();
                const userBudget = await readBudget();

                // Update the income and budget states
                setIncome(userIncome);
                setBudget(userBudget);

                // Generate and display the pie chart using the budget
                userBudget.createPieChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Budget</h1>

            <p>Your income is: ${income}</p> {/* Display the user's income */}

            <Link to="../configure-budget">
                <button>Configure Budget</button>
            </Link>
            <canvas id="pie-chart" width="400" height="400"></canvas>
        </div>
    );
};

export default PaycheckBudget;

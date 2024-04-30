import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import Budget from "../../classes/Budget";
import Chart from 'chart.js/auto';
import '../../css/styles.css';
import readBudget from "../../components/Crud/readBudget";
import readIncome from "../../components/Crud/readIncome";
import { useState, useEffect } from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import updateBudgetCategories from "../../components/Crud/updateBudgetCategories";

const PaycheckBudget = () => {
    const [income, setIncome] = useState(null); // State to store the user's income
    const [budget, setBudget] = useState(null); // State to store the user's budget

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                // Get Firebase Auth instance
                const auth = getAuth();

                // Listen for changes in authentication state
                const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                    if (currentUser) {
                        // Fetch the budget from the database
                        const budgetData = await readBudget();
                        let income = await readIncome()

                        // Update the budget state
                        setBudget(budgetData);
                        setIncome(income);

                        budgetData.correctBudgetOffIncome(income)
                        setBudget(budgetData);

                        try {
                          let canvas = document.getElementById("pie-chart");
                          let chartInstance = Chart.getChart(canvas);
                          chartInstance.destroy()
                        } catch (error){
                            console.log("cannot destroy chart, no instance found.")
                        }

                        // Generate and display the pie chart using the budget
                        budgetData.createPieChart();
                        await updateBudgetCategories(budgetData.categories)
                    } else {
                        console.log('No user is currently signed in.');
                    }
                });

                // Unsubscribe from the listener when the component unmounts
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        // Call the fetchBudget function when the component mounts
        fetchBudget();
    }, []); // Empty dependency array to ensure the effect runs only once


    return (
            <div className="defaultPage">
                <h1 className="header">Budget</h1>
                <p>Your income is: ${income}</p> {/* Display the user's income */}

                <Link to="../configure-budget">
                    <button className="button">Configure Budget</button>
                </Link>
                <canvas className="pie-chart" id="pie-chart" width="50" height="50"></canvas>
                <br></br>
                <ul>
                    {budget && budget.categories.map((category, index) => (
                        <li key={index}>
                            <div>
                                <strong>{category.name}:</strong>
                                <strong> $</strong>{category.dollarAmount.toFixed(2)}
                                <strong> |</strong> {category.percentage.toFixed(2)}%
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
        ;
};

export default PaycheckBudget;

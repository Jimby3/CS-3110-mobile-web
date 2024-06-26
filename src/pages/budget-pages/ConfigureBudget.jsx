import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import updateBudgetCategories from "../../components/Crud/updateBudgetCategories";
import readBudget from "../../components/Crud/readBudget";
import Budget from "../../classes/Budget";
import '../../css/styles.css';
import readIncome from "../../components/Crud/readIncome";

const ConfigureBudget = () => {
    // State to store the budget object
    const [budget, setBudget] = useState(null);

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

                        // Update the budget state
                        setBudget(budgetData);
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
    // Empty dependency array to ensure the effect runs only once

    const handleEdit = (index) => {
        // Implement edit functionality
        window.location = `/configure-budget-category?index=${index}`;
    };

    const handleDelete = async (categoryName) => {
        console.log(`Delete category: ${categoryName}`);
        try {
            const updatedCategories = budget.categories.filter(category => category.name !== categoryName);

            // Update the budget categories in the database
            await updateBudgetCategories(updatedCategories);

            // Update the budget state with the new categories
            setBudget(prevBudget => ({
                ...prevBudget,
                categories: updatedCategories
            }));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    return (
        <div className="defaultPage">
            <h1 className="header">Budget Configuration</h1>
            {/* Render categories if budget is available */}
            {budget && (
                <div>
                    <h2 className="header">Categories:</h2>
                    <ul>
                        {budget.categories.map((category, index) => (
                            <li key={index}>
                                <div>
                                    <strong>Category:</strong> {category.name}
                                    <strong> $</strong>{category.dollarAmount.toFixed(2)}
                                    <strong> |</strong> {category.percentage.toFixed(2)}%
                                    <br></br>
                                    <button className="button" onClick={() => handleEdit(index)}>Edit</button>
                                    <button className="button" onClick={() => handleDelete(category.name)}>Delete
                                    </button>
                                    <br></br>
                                    <br></br>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Link to="/configure-budget-category">
                <button className="button">Add New</button>
            </Link>
            <Link to="/paycheck-budget">
                <button className="button">Go Back</button>
            </Link>
        </div>
    );
};

export default ConfigureBudget;

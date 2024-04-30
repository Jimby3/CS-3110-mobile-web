import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Category from "../../classes/Category";
import Budget from "../../classes/Budget";
import '../../css/styles.css';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import readBudget from "../../components/Crud/readBudget";
import updateBudgetCategories from "../../components/Crud/updateBudgetCategories";
import readIncome from "../../components/Crud/readIncome";


const ConfigureBudgetCategory = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [budget, setBudget] = useState(null);

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                // Get Firebase Auth instance and current user
                const auth = await getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    throw new Error('No user is currently signed in.');
                }

                // Fetch the budget from the database
                const budgetData = await readBudget()

                // Update the budget state
                setBudget(budgetData);
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        // Call the fetchBudget function when the component mounts
        fetchBudget();

    }, []); // Empty dependency array to ensure the effect runs only once

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Retrieve stored budget from the database
        let budget = await readBudget();

        // Access the form data
        const formData = new FormData(event.target);
        const categoryName = formData.get('categoryName');
        const amountType = formData.get('amountType');
        const amount = parseFloat(formData.get('budgetAmount'));

        // Create a new category object
        let category = new Category(categoryName);

        // Set the dollar amount or percentage based on the selected type
        if (amountType === 'dollars') {
            category.dollarAmount = amount;
            category.trueDollar = true;
        } else {
            category.percentage = amount;
        }

        // Check if editing an existing category by index
        const queryParams = new URLSearchParams(location.search);
        const index = queryParams.get('index');

        if (index !== null) {
            // Editing an existing category
            budget.editCategoryByIndex(index, category);
        } else {
            // Adding a new category
            budget.addCategory(category);
        }

        budget.correctBudgetOffIncome(await readIncome())

        // Update the budget categories in the database
        await updateBudgetCategories(budget.categories);

        // Navigate back to the budget configuration page
        window.location = '/configure-budget';
    };



    return (
        <div className="defaultPage">
            <h1 className="header">Configure Category</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="categoryName">Category Name: </label>
                    <input type="text" id="categoryName" name="categoryName" required placeholder="Enter category name"/>
                </div>
                <div>
                    <input type="radio" id="dollars" name="amountType" value="dollars" defaultChecked={true}/>
                    <label className="form-label" htmlFor="dollars">Dollars</label>
                    <h6>or</h6>
                    <input type="radio" id="percentage" name="amountType" value="percentage"/>
                    <label className="form-label" htmlFor="percentage">Percentage (%)</label>
                    <br/>
                    <label className="form-label" htmlFor="budgetAmount">Amount:</label>
                    <input type="number" id="budgetAmount" name="budgetAmount" min="0" step="0.01" required placeholder="123"/>
                </div>
                <button className="button" type="submit">Save</button>
                <Link to="/configure-budget">
                    <button className="button" type="Button">Cancel</button>
                </Link>
            </form>

        </div>

    );
};

export default ConfigureBudgetCategory;

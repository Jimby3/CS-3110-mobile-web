import React from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Category from "../../classes/Category";
import Budget from "../../classes/Budget";


const ConfigureBudgetCategory = () => {

    const location = useLocation();

    const handleSubmit = (event) => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const queryParams = new URLSearchParams(location.search);
        let index = queryParams.get('index');

        event.preventDefault();

        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));
        // Instantiate a new budget if there's no stored budget
        let budget = storedBudget ? Budget.fromJSON(storedBudget) : new Budget();


        // Access the form data
        const formData = new FormData(event.target);

        let amountType = formData.get('amountType')
        let amount = formData.get('budgetAmount')

        // Assign Form Data to a Category Object
        let category = new Category(formData.get('categoryName'))

        // Putting either the dollar amount or percentage amount into the category object
        if(amountType === 'dollars'){

            category.dollarAmount = amount

        } else {

            category.percentage = amount

        }

        if(index){
            budget.editCategoryByIndex(index, category)
        } else {
            budget.addCategory(category)
        }


        sessionStorage.setItem("budget", JSON.stringify(budget))
        window.location = '/configure-budget';


    };


    return (
        <div>
            <Navbar/>
            <h1>Configure Category</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="categoryName">Category Name: </label>
                    <input type="text" id="categoryName" name="categoryName" required placeholder="Enter category name"/>
                </div>
                <div>
                    <input type="radio" id="dollars" name="amountType" value="dollars" defaultChecked={true}/>
                    <label htmlFor="dollars">Dollars</label>
                    <h6>or</h6>
                    <input type="radio" id="percentage" name="amountType" value="percentage"/>
                    <label htmlFor="percentage">Percentage (%)</label>
                    <br/>
                    <label htmlFor="budgetAmount">Amount:</label>
                    <input type="number" id="budgetAmount" name="budgetAmount" min="0" step="0.01" required placeholder="123"/>
                </div>
                <button type="submit">Save</button>
                <Link to="/configure-budget">
                    <button type="Button">Cancel</button>
                </Link>
            </form>

        </div>

    );
};

export default ConfigureBudgetCategory;

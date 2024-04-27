import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Category from "../../classes/Category";
import Budget from "../../classes/Budget";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import readBudget from "../../components/Crud/readBudget";
import updateBudgetCategories from "../../components/Crud/updateBudget";
import updateBudget from "../../components/Crud/updateBudget";


const ConfigureBudgetCategory = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
    }, []);

    const handleSubmit = (event) => {

        const queryParams = new URLSearchParams(location.search);
        let index = queryParams.get('index');

        event.preventDefault();

        // Retrieve stored budget from db
        let budgetData = readBudget()
        let budget = Budget.fromJSON(budgetData)
        console.log(budget)


        // Access the form data
        const formData = new FormData(event.target);

        let amountType = formData.get('amountType')
        let amount = formData.get('budgetAmount')

        // Assign Form Data to a Category Object
        let category = new Category(formData.get('categoryName'))

        // Putting either the dollar amount or percentage amount into the category object
        if(amountType === 'dollars'){

            category.dollarAmount = amount
            category.trueDollar = true


        } else {

            category.percentage = amount

        }

        // if index is passed, edit instead of making a new category
        if(index){

            budget.editCategoryByIndex(index, category)

        } else {

            budget.addCategory(category)

        }


        sessionStorage.setItem("budget", JSON.stringify(budget))
        console.log(JSON.stringify(budget))
        updateBudget(budget.categories)
        // window.location = '/configure-budget';


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

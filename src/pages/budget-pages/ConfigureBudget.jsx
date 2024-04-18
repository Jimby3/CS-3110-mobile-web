import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Budget from "../../classes/Budget";

const ConfigureBudget = () => {

    // State to store the budget object
    let [budget, setBudget] = useState(new Budget());

    useEffect(() => {
        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));

        // Instantiate a new budget if there's no stored budget
        let newBudget = storedBudget ? Budget.fromJSON(storedBudget) : new Budget();

        // Update the budget state
        setBudget(newBudget);

        // Print the budget details
        newBudget.printBudget();
    }, []);

    const handleEdit = (index) => {
        // Implement edit functionality
        window.location = `/configure-budget-category?index=${index}`;
    };

    const handleDelete = (categoryName) => {
        console.log(`Delete category: ${categoryName}`);
        const updatedBudget = new Budget(); // Create a new instance of Budget
        updatedBudget.categories = budget.categories.filter(category => category.name !== categoryName); // Filter out the category to be deleted

        sessionStorage.setItem("budget", JSON.stringify(updatedBudget));

        setBudget(updatedBudget); // Update the state with the new budget object
    };


    return (
        <div>
            <Navbar/>
            <h1>Budget Configuration</h1>
            {/* Render categories if budget is available */}
            {budget && (
                <div>
                    <h2>Categories:</h2>
                    <ul>
                        {budget.categories.map((category, index) => (
                            <li key={index}>
                                <div>
                                    <strong>Category:</strong> {category.name}
                                    <strong>$:</strong> {category.dollarAmount}
                                    <strong>%:</strong> {category.percentage}
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(category.name)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Link to="/configure-budget-category">
                <button>Add New</button>
            </Link>
            <Link to="/paycheck-budget">
                <button>Cancel</button>
            </Link>
        </div>
    );
};

export default ConfigureBudget;

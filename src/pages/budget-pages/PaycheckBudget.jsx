import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import Budget from "../../classes/Budget";

const PaycheckBudget = () => {

    useEffect(() => {

        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));

        // Instantiate a new budget if there's no stored budget
        let budget = Budget.fromJSON(storedBudget);

        // Generate pie chart data
        const pieChartData = budget.generatePieChartData();


        budget.income = 1000
        //converts dollars to % and vise versa for the budget
        budget.fillBudget()

        // Visualize the budget as a pie chart
        budget.visualizeAsPieChart(pieChartData);


    }, []);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));

        // Instantiate a new budget if there's no stored budget
        let budget = Budget.fromJSON(storedBudget);

        const formData = new FormData(event.target)
        let income = formData.get("incomeInput")

        const pieChartData = budget.generatePieChartData();


        budget.income = income
        //converts dollars to % and vise versa for the budget
        budget.fillBudget()

        budget.visualizeAsPieChart(pieChartData);
        sessionStorage.setItem("budget", JSON.stringify(budget))


    };

    return (
        <div>
            <Navbar/>
            <h1>Budget</h1>


            <form onSubmit={handleSubmit}>
                <label htmlFor="incomeInput">Enter Your Income:</label>
                <input
                    type="number"
                    id="incomeInput"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <Link to="../configure-budget">
                <button>Configure Budget</button>
            </Link>
            <canvas id="pie-chart" width="400" height="400"></canvas>


            <p>test rendering</p>
        </div>
    );
};

export default PaycheckBudget;

import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import Budget from "../../classes/Budget";

const PaycheckBudget = () => {

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));
        console.log(storedBudget)

        // Instantiate a new budget if there's no stored budget
        let budget = Budget.fromJSON(storedBudget);

        const formData = new FormData(event.target)
        let income = formData.get('incomeInput')
        console.log(income)




        budget.income = income

        //converts dollars to % and vise versa for the budget
        budget.correctBudgetOffIncome()

        budget.createPieChart()

        sessionStorage.setItem("budget", JSON.stringify(budget))


    };

    return (
        <div>
            <Navbar/>
            <h1>Budget</h1>


            <form onSubmit={handleSubmit}>
                <label htmlFor="incomeInput">Enter Your Income:</label>
                <input type="number" id="incomeInput" name="incomeInput" required/>
                <button type="submit">Submit</button>
            </form>

            <Link to="../configure-budget">
                <button>Configure Budget</button>
            </Link>
            <canvas id="pie-chart" width="400" height="400"></canvas>

        </div>
    );
};

export default PaycheckBudget;

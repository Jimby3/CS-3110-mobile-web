import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import Budget from "../../classes/Budget";

const PaycheckBudget = () => {

    useEffect(() => {

        // Retrieve stored budget from sessionStorage
        let storedBudget = JSON.parse(sessionStorage.getItem("budget"));

        // Instantiate a new budget if there's no stored budget
        let budget = Budget.fromJSON(storedBudget)

        budget.printBudget()


    }, []);

    return (
        <div>
            <Navbar />
            <h1>Budget</h1>


            <Link to="../configure-budget">
                <button>Configure Budget</button>
            </Link>
            {/* Define nested routes */}

            <p>test rendering</p>
        </div>
    );
};

export default PaycheckBudget;

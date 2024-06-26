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
import updateHourlyPay from "../../components/Crud/updateHourlyPay";
import updatePayPeriods from "../../components/Crud/updatePayPeriods";
import updateWithholding from "../../components/Crud/updateWithholding";
import updateAdditionalWithholding from "../../components/Crud/updateAdditionalWithholding";
import paycheckMath from "../../components/PaycheckMath";
import readHours from "../../components/Crud/readHours";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import updateIncome from "../../components/Crud/updateIncome";

const PaycheckConfig = () => {
    const [user, setUser] = useState(null);
    const [budget, setBudget] = useState(null);

    const [roundedValue, setRoundedValue] = useState(null);
    const [roundedFMLValue, setRoundedFMLValue] = useState(null);
    const [totalValue, setTotalValue] = useState(null);

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
        let hours = await readHours();
        let income = await readIncome();


        // Access the form data
        const formData = new FormData(event.target);
        const hourly = parseFloat(formData.get('payInput'));
        const payperiods = parseFloat(formData.get('payperiodInput'));
        const withholding = parseFloat(formData.get('withholdingInput'));
        const addwithholding = parseFloat(formData.get('addwithholdingInput'));
        const coloradoFML = formData.get('coloradoFMLInput');
        //fetch hours

        console.log("Hourly", hourly)
        console.log("payperiods", payperiods)
        console.log("withholding", withholding)
        console.log("addWithholding", addwithholding)
        console.log("Colorado FML", coloradoFML)

        const { rounded, roundedFML, total } = await paycheckMath(hours, hourly, payperiods, withholding, addwithholding)
        console.log("Rounded:", rounded);
        console.log("Rounded FML:", roundedFML);
        console.log("Total:", total);

        setRoundedValue(rounded);
        setRoundedFMLValue(roundedFML);
        setTotalValue(total);

        await updateHourlyPay(hourly)
        await updatePayPeriods(payperiods)
        await updateWithholding(withholding)
        await updateAdditionalWithholding(addwithholding)
        await updateIncome(total)

    };

    return (
        <div className="defaultPage">
            <h1 className="header">Paycheck Configuration</h1>
            <form onSubmit={handleSubmit}>
                <div class="col-8 mx-auto pt-3">
                    <label className="form-label" for="payInput" class="form-label"><strong>Hourly Pay</strong></label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="payInput" name="payInput" aria-label="Hourly Pay in USD" placeholder="Hourly Pay"></input>
                    </div>

                    <div class="mb-3">
                        <label className="form-label" for="payperiodInput" class="form-label"><strong>Number of Payperiods</strong></label>
                        <select class="form-select" id="payperiodInput" name="payperiodInput">
                                    <option selected>Number of Payperiods</option>
                                    <option value="260">Daily - 260 per year</option>
                                    <option value="52">Weekly - 52 per year</option>
                                    <option value="26">Biweekly - 26 per year</option>
                                    <option value="24">Semimonthly - 24 per year</option>
                                    <option value="12">Monthly - 12 per year</option>
                                    <option value="4">Quarterly - 4 per year</option>
                                    <option value="2">Semiannually - 2 per year</option>
                                    <option value="1">Annually - 1 per year</option>
                                </select>
                    </div>

                    <div class="accordian" id="accordionPayperiodHelp">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button className="button" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            ❔ Payperiod Help
                                        </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionPayperiodHelp">
                                <div class="accordion-body">
                                    <p><strong>Help</strong></p>
                                    <p>Semimonthly means twice a month usually on the 15th and 30th<br></br>Biweekly means every other week, usually on Fridays, regardless of month</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>

                    <label className="form-label" for="withholdingInput" class="form-label"><strong>Withholding Allowence Amount</strong></label>
                    <div class="input-group pb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="withholdingInput" name="withholdingInput" aria-label="Withholding Allowance Amount" placeholder="Withholding Allowance Amount"></input>
                    </div>
                    <label className="form-label" for="addwithholdingInput" class="form-label"><strong>Addtional Withholding Allowence (optional)</strong></label>
                    <div class="input-group pb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="addwithholdingInput" name="addwithholdingInput" aria-label="Addtional Withholding Allowance Amount (optional)" placeholder="Addtional Withholding Allowance Amount (optional)"></input>
                    </div>
                    <div class="accordian" id="accordionWithholdingHelp">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button className="button" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseOne">
                                ❔ Withholding Help
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionWithholdingHelp">
                                <div class="accordion-body">
                                    <p><strong>Annual Withholding Allowence Help</strong></p>
                                    <p>Typically most users if filing you are filing jointly you will put $10,000, otherwise use $5,000<br></br>If you have filled out form DR 0004 use that amount instead</p>
                                    <p><strong>Addtional Withholding</strong></p>
                                    <p>In most cases you will enter $0, unless you have filled out form DR 0004</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>

                </div>

                <p>Based on the given information your withholding is: ${roundedValue + roundedFMLValue}</p>
                <h3><strong>Your paycheck would be: ${totalValue}</strong></h3>

                <button className="button">Save Options and Calculate Income</button>
            </form>
            <hr></hr>
            <Link to="../paycheck">
            <button className="button">Back to Paycheck Calc</button>
            </Link>
            <p> </p>
            <p>For more information please check: <a href="https://tax.colorado.gov/withholding-tax-guide">Colorado Withholding Guide</a></p>

            <p>View Colorado's own withholding calculator: <a href="https://tax.colorado.gov/DR1098">Withholding Form DR1098</a></p>
            <p>Math understood from DR1098: <a href="https://tax.colorado.gov/sites/tax/files/documents/DR_1098_Withholding_Calculator_Nov_2023_Revision_for_2024.xlsx">Colorado Interactive Withholding Excel Sheet</a></p>

        </div>

    );
};

export default PaycheckConfig;
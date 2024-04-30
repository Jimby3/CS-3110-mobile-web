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
        console.log(addwithholding)
        console.log(coloradoFML)
        // Set the dollar amount or percentage based on the selected type
        //if (amountType === 'dollars') {
            //category.dollarAmount = amount;
            //category.trueDollar = true;
        //} else {
            //category.percentage = amount;
        //}

        
        const { rounded, roundedFML, total } = await paycheckMath(hours, hourly, payperiods, withholding, addwithholding)
        console.log("Rounded:", rounded);
        console.log("Rounded FML:", roundedFML);
        console.log("Total:", total);

        setRoundedValue(rounded);
        setRoundedFMLValue(roundedFML);
        setTotalValue(total);

        await updateHourlyPay(hourly)
        await updatePayPeriods(payperiods)
        await updateWithholding(roundedValue)
        await updateAdditionalWithholding(addwithholding)
        await updateIncome(totalValue)
    
    };

    return (
        <div className="defaultPage">
            <form onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="payInput" name="payInput" aria-label="Hourly Pay in USD" placeholder="Hourly Pay"></input>
                </div>

                <div class="mb-3">
                    <label className="form-label" for="payperiodInput" class="form-label">Number of Payperiods</label>
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
              <div class ="accordian" id="accordionPayperiodHelp">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button className="button" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Help Icon <i class="bi bi-question"></i>
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

              <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="withholdingInput" name="withholdingInput" aria-label="Withholding Allowence Amount" placeholder="Withholding Allowence Amount"></input>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="addwithholdingInput" name="addwithholdingInput" aria-label="Addtional Withholding Allowence Amount (optional)" placeholder="Addtional Withholding Allowence Amount (optional)"></input>
                </div>
              <div class ="accordian" id="accordionWithholdingHelp">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button className="button" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Help Icon <i class="bi bi-question"></i>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionWithholdingHelp">
                        <div class="accordion-body">
                            <p><strong>Annual Withholding Allowence Help</strong></p>
                            <p>Typically most users if filing you are filing jointly you will put $10,000, otherwise use $5,000<br></br>If you have filled out form DR 0004 use that amount instead</p>
                            <p><strong>Addtional Witholding</strong></p>
                            <p>Most cases you will enter $0, unless you have filled out form DR 0004</p>
                        </div>
                    </div>
                </div>
              </div>
              
              <hr></hr>


              <p>Based on the given information your withholding is: ${roundedValue + roundedFMLValue}</p>
              <p>Your paycheck would be: ${totalValue}</p>

            <button className="button" >Save hours</button>
            </form>
            <Link to="../paycheck">
                <button className="button">Back to Paycheck Calc</button>
              </Link>
            <hr></hr>
            <p>For more information please check: https://tax.colorado.gov/withholding-tax-guide</p>
            <p>View Colorado's own calculator: https://tax.colorado.gov/DR1098 </p>
            <p>Math taken from: https://tax.colorado.gov/sites/tax/files/documents/DR_1098_Withholding_Calculator_Nov_2023_Revision_for_2024.xlsx</p>
            
        </div>

    );
};

export default PaycheckConfig;
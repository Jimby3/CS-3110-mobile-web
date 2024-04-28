import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const PaycheckConfig = () => {
    const setHours = 30;
    const [hourly, setHourly] = useState(0);
    const [payperiods, setPayperiods] = useState(26); // Default to biweekly
    const [allowance, setAllowance] = useState(0);
    const [addAllowance, setAddAllowance] = useState(0);

    const paycheckMath = async () => { 
        const wages = setHours * setHourly;
        const yearly = wages * payperiods;
        const withholding = Math.max(yearly - setAllowance, 0);
        const percentage = withholding * 0.044;
        const exactAmount = percentage / payperiods;
        const coloradoFML = setHours * 0.072;
        const rounded = exactAmount.toFixed(2);
        const roundedFML = coloradoFML.toFixed(2);

        return {
            rounded,
            roundedFML
        };
    }

    const inputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "payInput":
                setHourly(parseFloat(value));
                break;
            case "payperiodInput":
                setPayperiods(parseInt(value));
                break;
            case "withholdingInput":
                setAllowance(parseFloat(value));
                break;
            case "addwithholdingInput":
                setAddAllowance(parseFloat(value));
                break;
            default:
                break;
        }

    }

    const calculatedValues = paycheckMath();

    return (
        <div>
            <Navbar></Navbar>
            <form>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="payInput" aria-label="Hourly Pay in USD" placeholder="Hourly Pay" onChange={inputChange}></input>
                </div>

                <div class="mb-3">
                    <label for="payperiodInput" class="form-label">Number of Payperiods</label>
                    <select class="form-select" id="payperiodInput">
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
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
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
                  <input type="number" class="form-control" id="withholdingInput" aria-label="Withholding Allowence Amount" placeholder="Withholding Allowence Amount" onChange={inputChange}></input>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="addwithholdingInput" aria-label="Addtional Withholding Allowence Amount (optional)" placeholder="Addtional Withholding Allowence Amount (optional)" onChange={inputChange}></input>
                </div>
              <div class ="accordian" id="accordionWithholdingHelp">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
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


              <p>Estimated Yearly Income: Put explainer text</p>
              <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="yearlyTotal" aria-label="Estimated Yearly Income" placeholder="Estimated Yearly Income" value={calculatedValues.yearly} readonly></input>
            </div>
            
              <p>Total calulated witholding yearly total</p>
              <p>{calculatedValues.withholding}</p>
              <hr></hr>
              <p>Hidden: Percent {calculatedValues.percentage}</p>
              <p>Hidden: Unrounded {calculatedValues.exactAmount}</p>
              <p>Hidden: Rounded {calculatedValues.rounded}</p>
              <p>Colorado FML - Checkbox</p>
              <p>(If true do hours times 0.072, else 0)</p>

              <p>Return hidden rounded + colorado FML amount</p>
              <p>Rounded Withholding Amount: {calculatedValues.rounded}</p>
              <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="withholdingDisplay" aria-label="Estimated Yearly Income" placeholder="Estimated Yearly Income" value={calculatedValues.yearly} readonly></input>
            </div>
              <p>Colorado FML Amount: {calculatedValues.roundedFML}</p>
              <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="withholdingDisplay" aria-label="Estimated Yearly Income" placeholder="Estimated Yearly Income" value={calculatedValues.yearly} readonly></input>
            </div>
            <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="withholdingDisplay" aria-label="Estimated Yearly Income" placeholder="Estimated Yearly Income" value={calculatedValues.yearly} readonly></input>
            </div>

            </form>
            <Link to="../paycheck">
                <button>Back to Paycheck Calc</button>
              </Link>
            <hr></hr>
            <p>For more information please check: https://tax.colorado.gov/withholding-tax-guide</p>
            <p>View Colorado's own calculator: https://tax.colorado.gov/DR1098 </p>
            <p>Math taken from: https://tax.colorado.gov/sites/tax/files/documents/DR_1098_Withholding_Calculator_Nov_2023_Revision_for_2024.xlsx</p>
            
        </div>

    );
};

export default PaycheckConfig;
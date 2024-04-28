import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const PaycheckConfig = () => {
    /*var wages = hours * hourly;
    var yearly = wages * payperiods;
    var withholding = yearly - allowance;
    var percentage = withholding * 0.044;
    var excatAmount = percentage  / payperiods;
    var coloradoFML = hours * 0.072;
    var rounded = excatAmount.toFixed(2);
    var roundedFML = coloradoFML.toFixed(2);
    */
   var setHours = 0;
   const hours = 0;
   var setHourly = 0;
   var setPayperiods = 0;
   var setAllowance = 0;
   var setAddAllowance = 0;

    const paycheckMath = async () => {

    }


    paycheckMath();

    return (
        <div>
            <Navbar></Navbar>
            <form>
                <label for="payInput">Hourly Rate</label><br></br>
                <input type="number" id="payInput" name="payInput"></input><br></br>

                <label for="payperiodInput">Payperiods per year</label><br></br>
                <select name="payperiodInput" id="payperiodInput">
                    <option value="weekly">Weekly - 52 per year</option>
                    <option value="biweekly">Biweekly - 26 per year</option>
                    <option value="monthly">Monthly - 12 per year</option>
                    <option value="semimonthly">Semi-Monthly - 24 per year</option>
              </select><br></br>

              <hr></hr>

              <p>Withholding Allowence Amount - provide help icon</p>
              <label for="withholdingInput">Withholding Allowence Amount</label><br></br>
              <input type="number" id="withholdingInput" name="withholdingInput"></input><br></br>

              <label for="addwithholdingInput">Addtional Withholding Allowence Amount (optional)</label><br></br>
              <input type="number" id="addwithholdingInput" name="addwithholdingInput"></input>
              <hr></hr>


              <p>Estimated Yearly Income: Put explainer text</p>
              <p>(Wages * Payperiod Number)</p>
              <p>Total calulated witholding yearly total</p>
              <p>(Yearly - withholding allowance, if below 0, set to 0)</p>
              <hr></hr>
              <p>Hidden Value: Percentage</p>
              <p>(Yearly allowance (above) * 0.044) - idk why lol</p>
              <p>Hidden: Payperiod Allowence - unrounded</p>
              <p>(Percent / payperiod number)</p>
              <p>Hidden Rounded</p>
              <p>(Percent / payperiod number)</p>
              <p>Colorado FML - Checkbox</p>
              <p>(If true do hours times 0.072, else 0)</p>

              <p>Return hidden rounded + colorado FML amount</p>

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
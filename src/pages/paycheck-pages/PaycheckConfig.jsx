import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

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
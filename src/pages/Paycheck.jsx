import React from "react";
import Navbar from "../components/Navbar";

const Paycheck = () => {
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
              <label for="hoursInput">Hours Worked</label><br></br>
              <input type="number" id="hoursInput" name="hoursInput"></input><br></br>
              <label for="payInput">Hourly Rate</label><br></br>
              <input type="number" id="payInput" name="payInput"></input>
              <p>This is where the gross pay will go</p>
              <hr></hr>
              <label for="payperiodInput">Payperiods per year</label><br></br>
              <select name="payperiodInput" id="payperiodInput">
                <option value="weekly">Weekly - 52 per year</option>
                <option value="biweekly">Biweekly - 26 per year</option>
                <option value="monthly">Monthly - 12 per year</option>
                <option value="semimonthly">Semi-Monthly - 24 per year</option>
              </select>

              <p>Withholding Allowence Amount - provide help icon</p>
              <label for="withholdingInput">Withholding Allowence Amount</label><br></br>
              <input type="number" id="withholdingInput" name="withholdingInput"></input><br></br>

              <label for="addwithholdingInput">Addtional Withholding Allowence Amount (optional)</label><br></br>
              <input type="number" id="addwithholdingInput" name="addwithholdingInput"></input>
              <hr></hr>

              <p>Estimated Yearly Income: Put explainer text</p>
              <label for="addwithholdingInput">Estimated Yearly Income:</label><br></br>
              <p>Math</p>
              <p>Total calulated witholding yearly total</p>
              <p>Math</p>
              <hr></hr>
              <p>Hidden Value: Percentage</p>
              <p>Hidden: Payperiod Allowence - unrounded</p>
              <p>Hidden Rounded</p>
              <p>Colorado FML - Checkbox</p>
              <p>If true do hours times 0.072</p>
              <p>Final Value: </p>
            </form>

        </div>
    );
};

export default Paycheck;
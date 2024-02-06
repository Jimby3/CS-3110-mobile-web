import React from "react";
import Navbar from "../components/Navbar";
 

  function WithholdingState({ wages, payperiods, allowance, addtional, hours }) {
    
    var yearly = wages * payperiods;
    var withholding = yearly - allowance;
    var percentage = withholding * 0.044;
    var excatAmount = percentage  / payperiods;
    var coloradoFML = hours * 0.072;

    return (
      <ul>    
        <li>Paycheck Gross Wages: {wages}</li>
        <li>Number of Payperiods: {payperiods}</li>
        <li>Withholding Allowance: {allowance}</li>
        <li>Addtional Allowance: {addtional}</li>
        <hr></hr>
        <li>Estimated Yearly Income: ${yearly}</li>
        <li>Withholding Yearly: {withholding}</li>
        <li>Percentage: {percentage}</li>
        <li>Payperiod Check: {excatAmount}</li>
        <li>State Withholding (rounded up): round</li>
        <li>Colorado FML: {coloradoFML}</li>
        <li>Total: {excatAmount + coloradoFML}</li>

      </ul>
    );
  }

const Paycheck = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Testing</h1>
            <form></form>
              <label for="hoursWorked">Hours Worked</label><br></br>
              <input type="text" id="hoursWorked" name="hoursWorked"></input><br></br>
              <label for="hourlyRate">Hourly Rate:</label><br></br>
              <input type="text" id="hourlyRate" name="hourlyRate"></input><br></br>
              <hr></hr>
              <label for="payperiods">Payperiods Per Year:</label><br></br>
              <input type="text" id="payperiods" name="payperiods"></input><br></br>
              <label for="allowance">Allowance:</label><br></br>
              <input type="text" id="allowance" name="allowance"></input>
              <label for="addAllowance">Additional Allowance:</label><br></br>
              <input type="text" id="addAllowance" name="addAllowance"></input><br></br>

            <WithholdingState wages={480} payperiods={26} allowance={5000} addtional={0} hours={30}/>
        </div>
    );
};
 
export default Paycheck;


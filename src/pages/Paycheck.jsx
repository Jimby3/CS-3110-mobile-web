import React from "react";
import Navbar from "../components/Navbar";
 

  function WithholdingState({ wages, payperiods, allowance, addtional }) {
    return (
      <ul>    
        <li>Paycheck Gross Wages: {wages}</li>
        <li>Number of Payperiods: {payperiods}</li>
        <li>Withholding Allowance: {allowance}</li>
        <li>Addtional Allowance: {addtional}</li>
        <hr></hr>
        <li>Estimated Yearly Income: ${wages * payperiods}</li>
        yearly = {wages * payperiods}
        <li>Withholding Yearly: {wages * payperiods - allowance}</li>
        <li>Percentage: {wages * payperiods - allowance * 0.044}</li>
        <li>Payperiod Check: Percentage / Number of Payperiods</li>
        <li>State Withholding (rounded up): round</li>
        <li>Colorado FML: Hours worked X 0.0072</li>
        <li>Total: Withholding + FML</li>

      </ul>
    );
  }

const Paycheck = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Testing</h1>

            <WithholdingState wages={480} payperiods={26} allowance={5000} addtional={0}/>
        </div>
    );
};
 
export default Paycheck;
import React from "react";
 
const WithholdingMath = ({hours, hourly, payperiods, allowance, addtional}) => {
    var wages = hours * hourly;
    var yearly = wages * payperiods;
    var withholding = yearly - allowance;
    var percentage = withholding * 0.044;
    var excatAmount = percentage  / payperiods;
    var coloradoFML = hours * 0.072;
    var rounded = excatAmount.toFixed(2);
    var roundedFML = coloradoFML.toFixed(2);

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
        <li>State Withholding (rounded up): {rounded}</li>
        <li>Colorado FML: {roundedFML}</li>
        <li>Gov Taking Total: {rounded + roundedFML}</li>
        <li>Gross? : {wages - rounded - roundedFML}</li>

      </ul>
    );
};
 
export default WithholdingMath;


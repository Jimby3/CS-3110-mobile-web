import React from "react";
import Navbar from "../components/Navbar";
 

  function WithholdingState({hours, hourly, payperiods, allowance, addtional}) {
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
  }

const Paycheck = () => {
  const [hours, setHours] = React.useState('');
  const [hourly, setHourly] = React.useState('');
  const [payperiods, setPayperiods] = React.useState('');
  const [allowance, setAllowance] = React.useState('');
  const [addallowance, setAddAllowance] = React.useState('');
    return (
        <div>
            <Navbar></Navbar>
            <h1>Payperiod</h1>
            <form></form>
              <label for="hoursWorked">Hours Worked</label><br></br>
              <input type="text" 
                id="hoursWorked" 
                name="hoursWorked"
                value={hours}
                onChange={event => {
                  setHours(event.target.value);
                }}>
              </input><br></br>
              <p>{hours}</p> 

              <label for="hourlyRate">Hourly Rate:</label><br></br>
              <input type="text" 
                id="hourlyRate" 
                name="hourlyRate"
                value={hourly}
                onChange={event => {
                  setHourly(event.target.value);
                }}>
              </input><br></br>
              <p>{hourly}</p>
              <hr></hr>

              <label for="payperiods">Payperiods Per Year:</label><br></br>
              <input type="text" 
                id="payperiods" 
                name="payperiods"
                value={payperiods}
                onChange={event => {
                  setPayperiods(event.target.value);
                }}>
              </input><br></br>

              <label for="allowance">Allowance:</label><br></br>
              <input type="text" 
                id="allowance" 
                name="allowance"
                value={allowance}
                onChange={event => {
                  setAllowance(event.target.value);
                }}></input>
              
              <label for="addAllowance">Additional Allowance:</label><br></br>
              <input type="text" 
                id="addAllowance" 
                name="addAllowance"
                value={addallowance}
                onChange={event => {
                  setAddAllowance(event.target.value);
                }}></input><br></br>

            <WithholdingState hours={hours} hourly={hourly} payperiods={payperiods} allowance={allowance} addtional={addallowance}/>
        </div>
    );
};
 
export default Paycheck;


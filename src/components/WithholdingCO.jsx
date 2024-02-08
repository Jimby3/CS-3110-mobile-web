import React from "react";
 
const WithholdingCO = () => {
    const [hours, setHours] = React.useState('');
    const [hourly, setHourly] = React.useState('');
    const [payperiods, setPayperiods] = React.useState('');
    const [allowance, setAllowance] = React.useState('');
    const [addallowance, setAddAllowance] = React.useState('');
    return (
        <form>
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
            </form>
    );
};
 
export default WithholdingCO;


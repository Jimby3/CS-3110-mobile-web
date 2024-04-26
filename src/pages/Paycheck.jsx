import React from "react";
import Navbar from "../components/Navbar";
import UserCreate from "../components/Crud/usercreate";
 
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
            <p>User create</p>
            <UserCreate></UserCreate>
            <h1>Testing</h1>

            <form>
        <label for="hoursWorked">Hours Worked</label><br></br>
              <input type="text" 
                id="hoursWorked" 
                name="hoursWorked"
                value="Aa"
                onChange={event => {
                  setHours(event.target.value);
                }}>
              </input><br></br>
              <p>{hours}</p> 

              <label for="hourlyRate">Hourly Rate:</label><br></br>
              <input type="text" 
                id="hourlyRate" 
                name="hourlyRate"
                value="Aa"
                onChange={event => {
                  setHourly(event.target.value);
                }}>
              </input><br></br>
              <p>"Aa"</p>
              <hr></hr>

              <label for="payperiods">Payperiods Per Year:</label><br></br>
              <input type="text" 
                id="payperiods" 
                name="payperiods"
                value="Aa"
                onChange={event => {
                  setPayperiods(event.target.value);
                }}>
              </input><br></br>

              <label for="allowance">Allowance:</label><br></br>
              <input type="text" 
                id="allowance" 
                name="allowance"
                value="Aa"
                onChange={event => {
                  setAllowance(event.target.value);
                }}></input>
              
              <label for="addAllowance">Additional Allowance:</label><br></br>
              <input type="text" 
                id="addAllowance" 
                name="addAllowance"
                value="Aa"
                onChange={event => {
                  setAddAllowance(event.target.value);
                }}></input><br></br>
            </form>
            
        </div>
    );
};
 
export default Paycheck;
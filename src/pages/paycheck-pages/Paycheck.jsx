import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {getAuth} from "firebase/auth";
import readIncome from "../../components/Crud/readIncome";
import readHourlyPay from "../../components/Crud/readHourlyPay";
import readPayPeriods from "../../components/Crud/readPayPeriods";
import readWithholding from "../../components/Crud/readWithholding";
import updateHours from "../../components/Crud/updateHours";
import paycheckMath from "../../components/PaycheckMath";
import updateIncome from "../../components/Crud/updateIncome";

const Paycheck = () => {
  const [roundedValue, setRoundedValue] = useState(null);
  const [roundedFMLValue, setRoundedFMLValue] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  
  useEffect(() => {
    //similar form of fetchBudget just modified for user only
      const fetchUser = async () => {
          try {
              // Get Firebase Auth instance and current user
              const auth = await getAuth();
              const currentUser = auth.currentUser;

              if (!currentUser) {
                  throw new Error('No user is currently signed in.');
              }

          } catch (error) {
              console.error('Error fetching budget:', error);
          }
      };

      // Call the fetchUser function when the component mounts
      fetchUser();

  }, []); // Empty dependency array to ensure the effect runs only once

  const handleSubmit = async (event) => {
      event.preventDefault();

      // Access the form data
      const formData = new FormData(event.target);
      const hours = parseFloat(formData.get('hoursInput'));

      const hourly = await readHourlyPay();
      console.log("Hourly", hourly)
      const payperiods = await readPayPeriods();
      console.log("payperiods", payperiods)
      const withholding = await readWithholding();
      console.log("withholding", withholding)
      const addwithholding = 0;

      const { rounded, roundedFML, total } = await paycheckMath(hours, hourly, payperiods, withholding, addwithholding)

      setRoundedValue(rounded);
      console.log("rounded", rounded)
      setRoundedFMLValue(roundedFML);
      console.log("roundedFML", roundedFML)
      setTotalValue(total);
      console.log("total", total)

      // Update the hours categories in the database
      await updateHours(hours);
      await updateIncome(total)
  };

    return (
        <div className="defaultPage">

            <form onSubmit={handleSubmit}>
              <label className="form-label" for="hoursInput">Hours Worked</label><br></br>
              <input className="input-field" type="number" id="hoursInput" name="hoursInput"></input><br></br>
              <button className="button" >Save hours and see income</button>
              <p>This is where the gross pay will go</p>
              <Link to="../paycheck-config">
                <button className="button" >Configure Withholding Amount/Config</button>
              </Link>
            
              <p>Final Value: </p><br></br>
            </form>

        </div>
    );
};

export default Paycheck;
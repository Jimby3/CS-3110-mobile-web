import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import readBudget from "../../components/Crud/readBudget";
import updateBudgetCategories from "../../components/Crud/updateBudgetCategories";
import readIncome from "../../components/Crud/readIncome";
import updateHours from "../../components/Crud/updateHours";

const Paycheck = () => {
  const [user, setUser] = useState(null);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
      const fetchBudget = async () => {
          try {
              // Get Firebase Auth instance and current user
              const auth = await getAuth();
              const currentUser = auth.currentUser;

              if (!currentUser) {
                  throw new Error('No user is currently signed in.');
              }

              // Fetch the budget from the database
              const budgetData = await readBudget()

              // Update the budget state
              setBudget(budgetData);
          } catch (error) {
              console.error('Error fetching budget:', error);
          }
      };

      // Call the fetchBudget function when the component mounts
      fetchBudget();

  }, []); // Empty dependency array to ensure the effect runs only once

  const handleSubmit = async (event) => {
      event.preventDefault();

      // Retrieve stored budget from the database
      let budget = await readBudget();

      // Access the form data
      const formData = new FormData(event.target);
      const hours = parseFloat(formData.get('hoursInput'));


      budget.correctBudgetOffIncome(await readIncome())

      // Update the budget categories in the database
      await updateHours(hours);
  };

    return (
        <div className="defaultPage">

            <form onSubmit={handleSubmit}>
              <label className="form-label" for="hoursInput">Hours Worked</label><br></br>
              <input className="input-field" type="number" id="hoursInput" name="hoursInput"></input><br></br>
              <button className="button" >Save hours</button>
              <p>This is where the gross pay will go</p>
              <Link to="../paycheck-config">
                <button className="button" >Configure Withholding Amount/Config</button>
              </Link>
            
              <p>Final Value: </p>
            </form>

        </div>
    );
};

export default Paycheck;
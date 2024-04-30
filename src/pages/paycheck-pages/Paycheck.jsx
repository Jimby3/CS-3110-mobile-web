import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {getAuth} from "firebase/auth";
import readIncome from "../../components/Crud/readIncome";
import updateHours from "../../components/Crud/updateHours";

const Paycheck = () => {
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

      // Update the hours categories in the database
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
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Paycheck = () => {
    return (
        <div>
            <Navbar></Navbar>

            <form>
              <label for="hoursInput">Hours Worked</label><br></br>
              <input type="number" id="hoursInput" name="hoursInput"></input><br></br>
              <p>This is where the gross pay will go</p>
              <Link to="../paycheck-config">
                <button>Configure Withholding Amount/Config</button>
              </Link>
            
              <p>Final Value: </p>
            </form>

        </div>
    );
};

export default Paycheck;
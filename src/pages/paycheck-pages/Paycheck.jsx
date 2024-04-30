import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Paycheck = () => {
  const [hours, setHours] = useState('');

  const hoursChange = (event) => {
    setHours(event.target.value); 
  };

    return (
        <div className="defaultPage">

            <form>
              <label className="form-label" for="hoursInput">Hours Worked</label><br></br>
              <input className="input-field" type="number" id="hoursInput" name="hoursInput" value={hours} onChange={hoursChange}></input><br></br>
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
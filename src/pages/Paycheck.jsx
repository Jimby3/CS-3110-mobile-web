import React from "react";
import Navbar from "../components/Navbar";
import WithholdingCO from "../components/WithholdingCO";

const Paycheck = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Payperiod</h1>
            <WithholdingCO></WithholdingCO>
            <WithholdingState hours={hours} hourly={hourly} payperiods={payperiods} allowance={allowance} addtional={addallowance}/>
        </div>
    );
};
 
export default Paycheck;


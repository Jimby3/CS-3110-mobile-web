import Navbar from "../components/Navbar";
 
const Budget = () => {
    return (
        <div>
            <Navbar></Navbar>
        <h1>Budget</h1>
            <div>
                <label htmlFor="income">Income:</label>
                <input type="number" id="income" name="income" />
            </div>
            <div>
                <label htmlFor="expenses">Expenses:</label>
                <input type="number" id="expenses" name="expenses" />
            </div>
            <div>
                <label htmlFor="savings">Savings:</label>
                <input type="number" id="savings" name="savings" />
            </div>
            <div>
                <button>Calculate</button>
            </div>
        </div>
    );
};
 
export default Budget;
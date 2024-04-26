import React from "react";
import Navbar from "../components/Navbar";
import SavingsGoals from "../classes/SavingsGoals";

const SavingsGoalPage = () => {

    const goals = new SavingsGoals();

    //form submissions
    const handleSubmit = (e) => {
        e.preventDefault();

        const {newCategory, existingCategory, goalAmount, contribution, existingGoals} = goals.state;

        //if new goal info
        if (newCategory && goalAmount) {
            const newGoal = {
                category: newCategory,
                goalAmount: parseFloat(goalAmount),
                currentAmount: 0,
            };

            goals.setState({
                existingGoals: [...existingGoals, newGoal],
                newCategory: "",
                goalAmount: "",
            });

        } else if (contribution && existingCategory && existingGoals.length > 0) {
            // If contribution amount and existing goals are provided, add contribution to specified  goal
            const updatedGoals = existingGoals.map((goal) => {
                if (goal.category === existingCategory) {
                    return {
                        ...goal,
                        currentAmount: goal.currentAmount + parseFloat(contribution),
                    };
                }
                return goal;
            });
            goals.setState({
                existingGoals: updatedGoals,
                contribution: "",
                existingCategory: ""
            });
        }
    };


    // Function to calculate goal progress with percentage
    const calculateProgress = (goal) => {
        return (goal.currentAmount / goal.goalAmount) * 100;
    };

    // Function to handle contribution to an existing goal
    const handleContribute = (e) => {
        const selectedCategory = e.target.value;
        goals.setState({existingCategory: selectedCategory});
    };

    const setNewCategory = (value) => {
        goals.setState({ newCategory: value });
    };

    const setGoalAmount = (value) => {
        goals.setState({ goalAmount: value });
    };

    const setContribution = (value) => {
        goals.setState({ contribution: value });
    };

    return (
        <div>
            <Navbar/>
            <h1>Savings Goals</h1>
            <form onSubmit={handleSubmit}>
            </form>
            <form onSubmit={handleSubmit}>
                <label>
                    Add a new goal to save for:
                    &nbsp;
                    <input type="text" value={goals.newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Enter category"/>

                </label><br />
                <label>
                    What is your goal amount for {goals.newCategory}?
                    &nbsp;
                    <input type="number" value={goals.goalAmount} onChange={(e) => setGoalAmount(e.target.value)}
                           placeholder="Enter goal amount"/>
                </label>
                <br />
                <button type="submit">Add New Goal</button>
            </form>
            <br />
            <h2>Existing Goals:</h2>
            <ul>
                {goals.existingGoals.map((goal, index) => (
                    <li key={index}>
                        {goal.category} - Goal: ${goal.goalAmount}, Current: ${goal.currentAmount}
                        {/* Progress bar */}
                        <div style={{width: "50%", margin: "0 auto", backgroundColor: "#ddd"}}>
                            <div
                                style={{
                                    width: `${calculateProgress(goal)}%`,
                                    height: "20px",
                                    backgroundColor: "#33A6FF",
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    Which goal would you like to contribute to?
                    &nbsp;
                    <select value={goals.existingCategory} onChange={handleContribute}>
                        <option value="">Select Goal</option>
                        {goals.existingGoals.map((goal, index) => (
                            <option key={index} value={goal.category}>{goal.category}</option>
                        ))}
                    </select>
                </label><br/>
                <label>
                    Contribution Amount:
                    &nbsp;
                    <input type="number" value={goals.contribution} onChange={(e) => setContribution(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Contribute to Goal</button>
            </form>
        </div>
    );
};


export default SavingsGoalPage;
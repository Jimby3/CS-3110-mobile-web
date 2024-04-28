import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SavingsGoals from "../classes/SavingsGoals";
import Goal from "../classes/Goal";

const SavingsGoalPage = () => {
    const [savingsGoals, setSavingsGoals] = useState(new SavingsGoals());
    const [newCategory, setNewCategory] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [contribution, setContribution] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newCategory && goalAmount) {
            const newGoal = new Goal(newCategory);
            newGoal.goalAmount = parseFloat(goalAmount);

            setSavingsGoals((prevSavingsGoals) => {
                const updatedGoals = [...prevSavingsGoals.goals, newGoal];
                return { ...prevSavingsGoals, goals: updatedGoals };
            });

            setNewCategory("");
            setGoalAmount("");
        } else if (contribution && savingsGoals.goals.length > 0) {
            const updatedGoals = savingsGoals.goals.map((goal) => {
                if (goal.category === savingsGoals.existingCategory) {
                    goal.currentAmount += parseFloat(contribution);
                }
                return goal;
            });

            setSavingsGoals((prevSavingsGoals) => {
                return { ...prevSavingsGoals, goals: updatedGoals };
            });

            setContribution("");
        }
    };

    const calculateProgress = (goal) => {
        return (goal.currentAmount / goal.goalAmount) * 100;
    };

    const handleContribute = (e) => {
        const selectedCategory = e.target.value;
        setSavingsGoals((prevSavingsGoals) => {
            return { ...prevSavingsGoals, existingCategory: selectedCategory };
        });
    };

    return (
        <div>
            <Navbar />
            <h1>Savings Goals</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Add a new goal to save for:
                    &nbsp;
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category"
                    />
                </label>
                <br />
                <label>
                    What is your goal amount for {newCategory}?
                    &nbsp;
                    <input
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        placeholder="Enter goal amount"
                    />
                </label>
                <br />
                <button type="submit">Add New Goal</button>
            </form>
            <br />
            <h2>Existing Goals:</h2>
            <ul>
                {savingsGoals.goals.map((goal, index) => (
                    <li key={index}>
                        {goal.category} - Goal: ${goal.goalAmount}, Current: ${goal.currentAmount}
                        {/* Progress bar */}
                        <div style={{ width: "50%", margin: "0 auto", backgroundColor: "#ddd" }}>
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
                    <select value={savingsGoals.existingCategory} onChange={handleContribute}>
                        <option value="">Select Goal</option>
                        {savingsGoals.goals.map((goal, index) => (
                            <option key={index} value={goal.category}>
                                {goal.category}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Contribution Amount:
                    &nbsp;
                    <input
                        type="number"
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Contribute to Goal</button>
            </form>
        </div>
    );
};

export default SavingsGoalPage;

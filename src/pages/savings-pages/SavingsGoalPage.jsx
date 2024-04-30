import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import SavingsGoals from "../../classes/SavingsGoals";
import Goal from "../../classes/Goal";
import "../../css/styles.css";
import {Link} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import readSavingsGoals from "../../components/Crud/readSavingsGoals";
import updateSavingsGoals from "../../components/Crud/updateSavingsGoals";

const SavingsGoalPage = () => {
    const [savingsGoals, setSavingsGoals] = useState(new SavingsGoals());
    const [newCategory, setNewCategory] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [contribution, setContribution] = useState("");


    useEffect(() => {
        const fetchSavingsGoals = async () => {
            try {
                const auth = getAuth();
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // User is signed in, proceed to fetch data
                        const data = await readSavingsGoals();
                        setSavingsGoals(data);
                    } else {
                        // User is signed out, handle accordingly
                        console.log("User is signed out.");
                    }
                });

                // Clean up function to unsubscribe from auth state changes
                return unsubscribe;
            } catch (error) {
                console.error("Error loading Savings Goals:", error);
            }
        };

        // Call the function to fetch savings goals when the component mounts
        fetchSavingsGoals();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newCategory && goalAmount) {
            const newGoal = new Goal(newCategory);
            newGoal.goalAmount = parseFloat(goalAmount);

            setSavingsGoals((prevSavingsGoals) => {
                const updatedGoals = [...prevSavingsGoals.goals, newGoal];
                return {...prevSavingsGoals, goals: updatedGoals};
            });

            const allGoals = [...savingsGoals.goals, newGoal];

            try{
                updateSavingsGoals(allGoals)
            } catch (error) {
                console.log("no goals")
            }

            setNewCategory("");
            setGoalAmount("");
        } else if (contribution && savingsGoals.goals.length > 0) {
                // Map through the goals to update the current amount if the category matches the existing category
                const updatedGoals = savingsGoals.goals.map((goal) => {
                    if (goal.category === savingsGoals.existingCategory) {
                        // Update the current amount of the goal
                        goal.currentAmount += parseFloat(contribution);
                    }
                    return goal;
                });

                // Update the savingsGoals state with the updated goals
                setSavingsGoals((prevSavingsGoals) => {
                    return { ...prevSavingsGoals, goals: updatedGoals };
                });

                try{
                    updateSavingsGoals(updatedGoals);
                } catch (error) {
                    console.log("no goals")
                }
                // Call updateSavingsGoals with the updated goals


                // Clear the contribution input field
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
        <div className="defaultPage">
            <h1 className="header">Savings Goals</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Add a new goal to save for:
                    &nbsp;
                    <input
                        className="input-field"
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category"
                        required={true}
                    />
                </label>
                <br/>
                <label className="form-label">
                    What is your goal amount for {newCategory}?
                    &nbsp;
                    <input
                        className="input-field"
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        placeholder="Enter goal amount"
                        required={true}
                    />
                </label>
                <br/>
                <button className="button" type="submit">Add New Goal</button>
            </form>
            <br></br>
            <h2 className="header">Existing Goals:</h2>
            <ul>
                {savingsGoals.goals.map((goal, index) => (
                    <li key={index}>
                        {goal.category} - Goal: ${goal.goalAmount}, Current: ${goal.currentAmount}
                        {/* Progress bar */}
                        <div style={{width: "75%", margin: "0 auto", backgroundColor: "#ddd"}}>
                            <div
                                style={{
                                    width: `${calculateProgress(goal)}%`,
                                    height: "25px",
                                    backgroundColor: "#5a855f",
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Which goal would you like to modify?
                    <br></br>
                    <select className="select" value={savingsGoals.existingCategory} onChange={handleContribute}>
                        <option value="">Select Goal</option>
                        {savingsGoals.goals.map((goal, index) => (
                            <option key={index} value={goal.category}>
                                {goal.category}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                {
                    savingsGoals.existingCategory && (
                        <div>
                            <label className="form-label">
                                Contribution Amount:
                                &nbsp;
                                <input className={"input-field"}
                                    type="number"
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </label>
                            <button className="button" type="submit"> Contribute </button>
                            <br/>
                            <Link to={`/modify-goal?category=${savingsGoals.existingCategory}`}>
                                <button className="button">Modify {savingsGoals.existingCategory}</button>
                            </Link>
                        </div>
                    )
                }
            </form>
        </div>
    );
};


export default SavingsGoalPage;
import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import SavingsGoals from "../../classes/SavingsGoals";
import "../../css/styles.css";
import {Link, useLocation} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import readSavingsGoals from "../../components/Crud/readSavingsGoals";
import updateSavingsGoals from "../../components/Crud/updateSavingsGoals";
import Goal from "../../classes/Goal";

const ModifyGoalPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    const [savingsGoals, setSavingsGoals] = useState(new SavingsGoals());
    const [newGoalName, setNewGoalName] = useState(category);
    const [newGoalAmount, setNewGoalAmount] = useState("");
    const [newCurrentAmount, setNewCurrentAmount] = useState("");
    const [selectedGoalCategory, setSelectedGoalCategory] = useState("");




    useEffect(() => {
        const fetchSavingsGoals = async () => {
            try {
                const auth = getAuth();
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // User is signed in, proceed to fetch data
                        const data = await readSavingsGoals();
                        setSavingsGoals(data);

                        // Set the selected goal category if category parameter is available
                        if (category) {
                            setSelectedGoalCategory(category);
                            let currentGoal = data.getGoalByCategory(category)
                            setNewGoalAmount(currentGoal.goalAmount)
                            setNewCurrentAmount(currentGoal.currentAmount)
                        }
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
    }, [category]);


    const handleDeleteSubmit = async (e) => {
        e.preventDefault();


        // Check if it's the last goal
        if (savingsGoals.goals.length === 1) {
            // It's the last goal, display an error message or handle it as needed
            window.alert("Cannot Have Zero Goals");
            return;
        }

        if (window.confirm('Are you sure you want to delete this item?')) {
            // Filter out the category to delete from the goals array
            const updatedGoals = savingsGoals.goals.filter(goal => goal.category !== category);

            // Update the savingsGoals state with the filtered goals
            await updateSavingsGoals(updatedGoals);

            window.location = '/savings'
        }
    };

    const handleModifyGoal = async (e) => {
      e.preventDefault();

      savingsGoals.goals = savingsGoals.goals.filter(goal => goal.category !== category);
       let goal = new Goal(newGoalName);
       goal.goalAmount = parseFloat(newGoalAmount);
       goal.currentAmount = parseFloat(newCurrentAmount)
       savingsGoals.addGoal(goal);

       await updateSavingsGoals(savingsGoals.goals);
       window.location = '/savings'
    };

    return (
        <div className="defaultPage" >
            <h1 className="header">Modify an Existing Goal</h1>
            <h3>Modifying {selectedGoalCategory}</h3>
            <form onSubmit={handleModifyGoal}>
                <label className="form-label">
                    Updated Goal Name:
                    &nbsp;
                    <input
                        type="text"
                        value={newGoalName}
                        placeholder={category}
                        onChange={(e) => setNewGoalName(e.target.value)}
                        required={true}
                    />
                </label>
                <br/>
                <label className="form-label">
                    Updated Goal Amount:
                    &nbsp;
                    <input
                        type="number"
                        value={newGoalAmount}
                        onChange={(e) => setNewGoalAmount(e.target.value)}
                        required={true}
                    />

                </label>
                <label className="form-label">
                    Updated Current Amount:
                    &nbsp;
                    <input
                        type="number"
                        value={newCurrentAmount}
                        onChange={(e) => setNewCurrentAmount(e.target.value)}
                        required={true}
                    />

                </label>
                <br/>
                <button className="button" type="submit">Finish Modifying</button>
                <Link to="/savings">
                    <button className="button" type="submit">Cancel</button>
                </Link>
            </form>
            <form onSubmit={handleDeleteSubmit}>
                <br/>
                <label className="form-label">
                    Would you like to delete {selectedGoalCategory}?
                    &nbsp;
                    <br></br>
                    <button className="button" type="submit">Yes</button>
                    <Link to="/savings">
                    <button className="button" type="submit">No</button>
                    </Link>
                </label>

            </form>
        </div>
    );
};

export default ModifyGoalPage;

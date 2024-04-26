import React, {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const GoalCreate = () => {
    const [newName, setNewName] = useState("")
    const [newBalance, setNewBalance] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newAmount, setNewAmount] = useState("")
    const [newBudgetId, setNewBudgetId] = useState("")
    const goalsCollectionRef = collection(db, "goals")

    const createGoal = async () => {
        await addDoc(goalsCollectionRef, {name: newName, balance: newBalance, description: newDescription, amount: newAmount, budget_id: newBudgetId});

    }

    return (
        <div>
            <input placeholder="Name of Goal" onChange={(event) => {setNewName(event.target.value)}}></input>
            <input placeholder="Current Balance" onChange={(event) => {setNewBalance(event.target.value)}}></input>
            <input placeholder="Description of Goal" onChange={(event) => {setNewDescription(event.target.value)}}></input>
            <input placeholder="Goal Amount" onChange={(event) => {setNewAmount(event.target.value)}}></input>
            <input placeholder="Budget ID" onChange={(event) => {setNewBudgetId(event.target.value)}}></input>
            <button onClick={createGoal}> Create new Goal</button>
        </div>
    )
}

export default GoalCreate;
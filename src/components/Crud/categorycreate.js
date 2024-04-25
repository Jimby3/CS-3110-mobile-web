import React, {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const CategoryCreate = () => {
    const [newName, setNewName] = useState("")
    const [newBalance, setNewBalance] = useState("")
    const [newPercent, setNewPercent] = useState("")
    const [newBudgetId, setNewBudgetId] = useState("")
    const categoriesCollectionRef = collection(db, "categories")

    const createGoal = async () => {
        await addDoc(categoriesCollectionRef, {name: newName, balance: newBalance, percent: newPercent, budget_id: newBudgetId});

    }

    return (
        <div>
            <input placeholder="Name of Category" onChange={(event) => {setNewName(event.target.value)}}></input>
            <input placeholder="Current Balance" onChange={(event) => {setNewBalance(event.target.value)}}></input>
            <input placeholder="Percent of total budget" onChange={(event) => {setNewPercent(event.target.value)}}></input>
            <input placeholder="Budget ID" onChange={(event) => {setNewBudgetId(event.target.value)}}></input>
            <button onClick={createGoal}> Create new Category</button>
        </div>
    )
}

export default CategoryCreate;
 import React, {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const CategoryCreate = () => {
    const [newName, setNewName] = useState("")
    const [newBalance, setNewBalance] = useState("")
    const [newPercent, setNewPercent] = useState("")
    const [newBudgetId, setNewBudgetId] = useState("")
    const categoriesCollectionRef = collection(db, "categories")

    const createCategory = async () => {
        await addDoc(categoriesCollectionRef, {name: newName, balance: newBalance, percent: newPercent, budget_id: newBudgetId});

    }

    return (
        <div>
            <input categoryName="Name of Category" onChange={(event) => {setNewName(event.target.value)}}></input>
            <input categoryBalance="Current Balance" type="number" onChange={(event) => {setNewBalance(event.target.value)}}></input>
            <input categoryPercent="Percent of total budget" type="number" onChange={(event) => {setNewPercent(event.target.value)}}></input>
            <input categoryBudgetID="Budget ID" onChange={(event) => {setNewBudgetId(event.target.value)}}></input>
            <button onClick={createCategory}> Create new Category</button>
        </div>
    )
}

export default CategoryCreate;
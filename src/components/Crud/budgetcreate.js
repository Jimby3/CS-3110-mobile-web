import React, {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const BudgetCreate = () => {
    const [newUserId, setNewUserId] = useState("")
    const [newGoalsId, setNewGoalsId] = useState("")
    const [newCategoriesId, setNewCategoriesId] = useState("")
    const [users, setUsers] = useState([])
    const budgetsCollectionRef = collection(db, "budgets")

    const createBudget = async () => {
        await addDoc(budgetsCollectionRef, {goalsid: newGoalsId, categoriesid: newCategoriesId, userid: newUserId});

    }

    return (
        <div>
            <input placeholder="UserId..." onChange={(event) => {setNewUserId(event.target.value)}}></input>
            <input placeholder="GoalsId" onChange={(event) => {setNewGoalsId(event.target.value)}}></input>
            <input placeholder="CategoriesId" onChange={(event) => {setNewCategoriesId(event.target.value)}}></input>
            <button onClick={createBudget}> Create new Budget</button>
        </div>
    )
}

export default BudgetCreate;
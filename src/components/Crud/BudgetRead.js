import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const BudgetRead = ({ username }) => {
    //const usersRef = collection(db, "users");
    const [budgets, setBudgets] = useState([]);
    const budgetsCollectionRef = collection(db, "budgets");
    //const budgetRef = doc(db, "budgets", "username");

    useEffect(() => {
        const getBudgets = async () => {
            const querySnapshot = await getDocs(budgetsCollectionRef)
            const budgetData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            getBudgets(budgetData);
        };

        getBudgets();
    }, [username]); 
    return (
        <div>
            <p>Budget Info</p>
            <ul>
                {budgets.map(budget => (
                    <li key={budget.id}>
                        <p>Name: {budget.categoriesid}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default BudgetRead;
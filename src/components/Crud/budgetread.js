import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "./firebase-config";

const BudgetRead = ({ username }) => {
    //const usersRef = collection(db, "users");
    //const [budgets, setBudgets] = useState([]);
    //const budgetsCollectionRef = collection(db, "budgets");
    const budgetRef = doc(db, "budgets", "username");

    useEffect(() => {
        const getBudgets = async () => {
            
        };

        getBudgets();
    }, []); 
    return (
        <div>
            <p>Blank</p>
        </div>
    )

}

export default BudgetRead;
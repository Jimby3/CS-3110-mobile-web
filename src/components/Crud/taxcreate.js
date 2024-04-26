import React, {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const TaxCreate = () => {
    const [newFederal, setNewFederal] = useState("")
    const [newState, setNewState] = useState("")
    const [newUserId, setNewUserId] = useState("")
    const taxesCollectionRef = collection(db, "taxes")

    const createTax = async () => {
        await addDoc(taxesCollectionRef, {federal_withholding: newFederal, state_withholding: newState, user_id: newUserId});

    }

    return (
        <div>
            <input placeholder="Federal Withholding Amount" onChange={(event) => {setNewFederal(event.target.value)}}></input>
            <input placeholder="State Withholding Amount" onChange={(event) => {setNewState(event.target.value)}}></input>
            <input placeholder="User ID" onChange={(event) => {setNewUserId(event.target.value)}}></input>
            <button onClick={createTax}> Create new Tax info</button>
        </div>
    )
}

export default TaxCreate;
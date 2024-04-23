import React, { useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const UserCreate = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, {email: newEmail, password: newPassword, username: newUsername});

    }

    return (
        <div>
            <input placeholder="Username..." onChange={(event) => {setNewUsername(event.target.value)}}></input>
            <input placeholder="Email" onChange={(event) => {setNewEmail(event.target.value)}}></input>
            <input placeholder="Password" onChange={(event) => {setNewPassword(event.target.value)}}></input>
            <button onClick={createUser}> Create User</button>
        </div>
    )
}

export default UserCreate;
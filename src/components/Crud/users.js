import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "./firebase-config";

const Users = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, {email: newEmail, password: newPassword, username: newUsername});

    }

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        //Array of users basically
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

    getUsers()
  }, []);

    return (
        <div>
            {users.map((user) => { return <div><h1>Name: {user.email}</h1></div>})}
            <input placeholder="Username..." onChange={(event) => {setNewUsername(event.target.value)}}></input>
            <input placeholder="Email" onChange={(event) => {setNewEmail(event.target.value)}}></input>
            <input placeholder="Password" onChange={(event) => {setNewPassword(event.target.value)}}></input>
            <button>Edit email</button>
            <button onClick={createUser}> Create User</button>
        </div>
    )

}

export default Users;
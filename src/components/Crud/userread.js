import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase-config";

const UserRead = () => {
    const usersCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        //Array of users basically
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

    getUsers()
  },  []);

  return (
    <div>
        {users.map((user) => { return <div><h1>Name: {user.email}</h1></div>})}
    </div>
)
}

export default UserRead;
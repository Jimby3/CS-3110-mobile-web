import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";

const Categories = () => {
    const [newBalance, setNewBalance] = useState(0)
    const [newName, setNewName] = useState("")
    const [newPercent, setNewPercent] = useState()
    const [categories, setCategories] = useState([])
    const categoriesCollectionRef = collection(db, "categories")

    const createCategory= async () => {
        await addDoc(categoriesCollectionRef, {balance: newBalance, name: newName, percent: newPercent});

    }
    
    useEffect(() => {
        const getCategories = async () => {
        const data = await getDocs(categoriesCollectionRef);
        setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

    getCategories()
  }, []);

    return (
        <div>
            <p>Blank</p>
            {categories.map((categories) => { return <div><h1>Category: {categories.name}</h1></div>})}
        </div>
    )

}

export default Categories;
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

function ReadIncome() {
    const [income, setIncome] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initialize Firebase Auth
        const auth = getAuth();

        // Register an observer to listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Get Firestore instance
                    const db = getFirestore();

                    // Reference to the users collection
                    const usersCollectionRef = collection(db, 'users');

                    // Query for the user's document based on userID field
                    const userQuery = query(usersCollectionRef, where('userId', '==', user.uid));

                    // Execute the query
                    const userQuerySnapshot = await getDocs(userQuery);

                    // Check if there are any matching documents
                    if (userQuerySnapshot.empty) {
                        throw new Error('No user document found for the current user.');
                    }

                    // Assuming there's only one document, get its reference
                    const userDocumentRef = userQuerySnapshot.docs[0].ref;

                    // Get the user document
                    const userDocSnapshot = await getDoc(userDocumentRef);

                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setIncome(userData.income);
                    } else {
                        throw new Error('User document does not exist.');
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Set loading to false if no user is signed in
            }
        });

        // Unsubscribe from the observer when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array to ensure the effect runs only once

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Income</h2>
            <p>User's Income: {income}</p>
        </div>
    );
}

export default ReadIncome;

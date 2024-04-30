import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            // Create user in Firebase Authentication
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Get user ID from userCredential
            const { user } = userCredential;

            // Get Firestore instance
            const db = getFirestore();

            // Reference to the 'users' collection
            const usersCollectionRef = collection(db, 'users');

            // Create a new user document in the 'users' collection
            const userDocRef = await addDoc(usersCollectionRef, {
                userId: user.uid, // Associate user document with user ID
                email: user.email, // Store user's email (you can add more fields as needed)
                income: 500,
                hours: 40,
                hourlyPay: 16,
                payPeriods: 2,
                withholding: 20,
                additionalWithholding: 5,
                colorado: true

            });

            // Reference to the 'budget' subcollection within the user document
            const budgetCollectionRef = collection(userDocRef, 'budget');

            // Create a new document in the 'budget' subcollection as a placeholder
            const budgetDocRef = await addDoc(budgetCollectionRef, {});

            // Reference to the 'categories' subcollection within the 'budget' document
            const categoriesCollectionRef = collection(budgetDocRef, 'categories');

            // Create a new document in the 'categories' subcollection as a placeholder
            await addDoc(categoriesCollectionRef, {

                name: "exampleCategory",
                dollarAmount: 200,
                percentage: 0,
                trueDollar: false

            });

            // Reference to the 'savingsGoals' subcollection within the user document
            const savingsGoalsCollectionRef = collection(userDocRef, 'savingsGoals');

            // Create a new document in the 'savingsGoals' subcollection as a placeholder
            const savingsGoalsDocRef = await addDoc(savingsGoalsCollectionRef, {});

            // Reference to the 'goals' subcollection within the 'savingsGoals' document
            const goalsCollectionRef = collection(savingsGoalsDocRef, 'goals');

            // Create a new document in the 'goals' subcollection as a placeholder
            await addDoc(goalsCollectionRef, {
                category: "exampleCategory",
                goalAmount: 10000,
                currentAmount: 2000

            });

            // User signed up successfully
            window.location = '/';
        } catch (error) {
            // Handle sign-up errors
            setError(error.message);
            console.error('Error signing up:', error);
        }
    };


    return (
        <div>
            <h2>Sign Up</h2>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <br></br>
            <br></br>
            <input  className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <br></br>
            <br></br>
            <button className="button" onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignUp;

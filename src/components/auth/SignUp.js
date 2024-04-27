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

            // Create user document in Firestore
            const db = getFirestore();
            const usersCollection = collection(db, 'users');
            const userDocRef = await addDoc(usersCollection, {
                userId: user.uid, // Associate user document with user ID
                email: user.email, // Store user's email (you can add more fields as needed)
                // Add additional user information here
            });

            // Create 'savingsGoals' subcollection
            await addDoc(collection(userDocRef, 'savingsGoals'), {}); // Creating an empty document as a placeholder

            // Create 'budget' subcollection
            await addDoc(collection(userDocRef, 'budget'), {}); // Creating an empty document as a placeholder

            // User signed up successfully
            window.location = '/'
        } catch (error) {
            // Handle sign-up errors
            setError(error.message);
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignUp;

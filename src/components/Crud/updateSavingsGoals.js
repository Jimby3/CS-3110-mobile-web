import { getAuth } from 'firebase/auth';
import {getFirestore, collection, getDocs, query, where, doc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';

const updateSavingsGoals = async (newGoals) => {
    console.log("New Goals in UpdateSavingsGoals", newGoals)
    try {
        // Get Firebase Auth instance and current user
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No user is currently signed in.');
        }

        // Get Firestore instance
        const db = getFirestore();

        // Reference to the users collection
        const usersCollectionRef = collection(db, 'users');

        // Query for the user's document based on userID field
        const userQuery = query(usersCollectionRef, where('userId', '==', currentUser.uid));

        // Execute the query
        const userQuerySnapshot = await getDocs(userQuery);

        // Check if there are any matching documents
        if (userQuerySnapshot.empty) {
            throw new Error('No user document found for the current user.');
        }

        // Assuming there's only one document, get its reference
        const userDocumentRef = userQuerySnapshot.docs[0].ref;

        const savingsGoalsCollectionRef = collection(userDocumentRef, "savingsGoals")


        const savingsGoalsQuerySnapshot = await getDocs(savingsGoalsCollectionRef)

        if (savingsGoalsQuerySnapshot.empty) {
            throw new Error('No savings Goals document found for the current user.');
        }

        // Reference to the user's savingsGoals document
        const savingsGoalsDocRef = savingsGoalsQuerySnapshot.docs[0].ref

        const goalsCollectionRef = collection(savingsGoalsDocRef, "goals")

        const existingGoalsSnapshot = await getDocs(goalsCollectionRef)

        console.log("Existing goals", existingGoalsSnapshot)
        console.log("New goals", newGoals)

        existingGoalsSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });


        await Promise.all(newGoals.map(async (goal) => {
            // Create a new document reference within the categories subcollection
            try {
                await addDoc(goalsCollectionRef, goal.toObject());
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }));

        console.log('Savings goals updated successfully');
    } catch (error) {
        console.error('Error updating savings goals:', error);
        throw error;
    }
};

export default updateSavingsGoals;

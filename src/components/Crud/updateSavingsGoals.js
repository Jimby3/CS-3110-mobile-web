import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, deleteDoc, addDoc } from 'firebase/firestore';

const updateSavingsGoals = async (goals) => {
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

        // Reference to the user's savingsGoals subcollection
        const savingsGoalsCollectionRef = collection(userDocumentRef, 'savingsGoals');

        // Delete all existing documents in the savingsGoals subcollection
        const goalsQuerySnapshot = await getDocs(savingsGoalsCollectionRef);
        goalsQuerySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Create new documents based on the provided goals
        await Promise.all(goals.map(async (goal) => {
            // Create a new document reference within the savingsGoals subcollection
            await addDoc(savingsGoalsCollectionRef, goal.toObject()); // Set the data for the new document
        }));

        console.log('Savings goals updated successfully');
    } catch (error) {
        console.error('Error updating savings goals:', error);
        throw error;
    }
};

export default updateSavingsGoals;

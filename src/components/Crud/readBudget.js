import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const readBudget = async () => {
    try {
        // Get Firebase Auth instance and current user
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No user is currently signed in.');
        }

        // Get Firestore instance
        const db = getFirestore();

        // Reference to the 'budget' subcollection for the user
        const budgetCollectionRef = collection(db, `users/${currentUser.uid}/budget`);

        // Query the 'budget' subcollection
        const budgetQuery = query(budgetCollectionRef);

        // Get documents from the 'budget' subcollection
        const budgetSnapshot = await getDocs(budgetQuery);

        // Parse and return budget data
        const budgetData = [];
        budgetSnapshot.forEach((doc) => {
            // Assuming each document in the 'budget' subcollection represents a budget item
            const budgetItem = doc.data();
            budgetData.push(budgetItem);
        });

        return budgetData;
    } catch (error) {
        console.error('Error reading budget:', error);
        throw error;
    }
};

export default readBudget;

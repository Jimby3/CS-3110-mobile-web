import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const readSavingsGoals = async () => {
    try {
        // Get Firebase Auth instance and current user
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No user is currently signed in.');
        }

        // Get Firestore instance
        const db = getFirestore();

        // Reference to the 'savingsGoals' subcollection for the user
        const savingsGoalsCollectionRef = collection(db, `users/${currentUser.uid}/savingsGoals`);

        // Query the 'savingsGoals' subcollection
        const savingsGoalsQuery = query(savingsGoalsCollectionRef);

        // Get documents from the 'savingsGoals' subcollection
        const savingsGoalsSnapshot = await getDocs(savingsGoalsQuery);

        // Parse and return savings goals data
        const savingsGoalsData = [];
        savingsGoalsSnapshot.forEach((doc) => {
            // Assuming each document in the 'savingsGoals' subcollection represents a savings goal
            const savingsGoal = doc.data();
            savingsGoalsData.push(savingsGoal);
        });

        return savingsGoalsData;
    } catch (error) {
        console.error('Error reading savings goals:', error);
        throw error;
    }
};

export default readSavingsGoals;

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import SavingsGoal from "../../classes/SavingsGoal"; // Assuming SavingsGoal class exists

const readSavingsGoals = async () => {
    try {
        // Get Firebase Auth instance and current user
        const auth = await getAuth();
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

        // Reference to the user's savings goals subcollection
        const goalsCollectionRef = collection(userDocumentRef, 'savingsGoals'); // Change collection name to 'savingsGoals'

        // Query the savings goals subcollection
        const goalsQuerySnapshot = await getDocs(goalsCollectionRef);

        // Check if there are any documents in the savings goals subcollection
        if (goalsQuerySnapshot.empty) {
            throw new Error('No savings goals document found for the current user.');
        }

        // Extract savings goals data from the query snapshot
        const goalsData = goalsQuerySnapshot.docs.map(doc => doc.data());

        // Convert goalsData into SavingsGoal objects
        const savingsGoals = goalsData.map(goalData => SavingsGoal.fromJSON(goalData));

        return savingsGoals;
    } catch (error) {
        console.error('Error reading savings goals:', error);
        throw error;
    }
};

export default readSavingsGoals;

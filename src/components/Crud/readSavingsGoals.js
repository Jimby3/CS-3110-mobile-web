import {getAuth} from 'firebase/auth';
import {collection, getDoc, getDocs, getFirestore, query, where} from 'firebase/firestore';
import SavingsGoals from "../../classes/SavingsGoals";

const readSavingsGoals = async () => {
    try {
        // Get Firebase Auth instance and current user
        const auth = await getAuth();
        const currentUser = await auth.currentUser;

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
        const savingsGoalsCollectionRef = collection(userDocumentRef, 'savingsGoals'); // Change collection name to 'savingsGoals'

        // Query the budget subcollection
        const savingsGoalsQuerySnapshot = await getDocs(savingsGoalsCollectionRef);

        // Check if there are any documents in the budget subcollection
        if (savingsGoalsQuerySnapshot.empty) {
            throw new Error('No budget document found for the current user.');
        }

        // Reference to the user's savings goals document
        const savingsGoalsDocumentRef = savingsGoalsQuerySnapshot.docs[0].ref;

        const savingsGoalsDocSnapshot = await getDoc(savingsGoalsDocumentRef)

        const savingsGoalsData = savingsGoalsDocSnapshot.data()

        if (!savingsGoalsDocSnapshot.exists()) {
            throw new Error('Budget document not found for the current user.');
        }
        // Reference to the savingsGoals document's goals subcollection
        const goalsSubcollectionRef = collection(savingsGoalsDocumentRef, 'goals');

        // Query the goals subcollection
        const goalsQuerySnapshot = await getDocs(goalsSubcollectionRef);

        // Check if there are any documents in the savings goals subcollection
        if (goalsQuerySnapshot.empty) {
            throw new Error('No savings goals document found for the current user.');
        }

        // Extract savings goals data from the query snapshot
        const goalsData = goalsQuerySnapshot.docs.map(doc => doc.data());
        console.log("Printing Goals Data", goalsData)

        return SavingsGoals.fromJSON({
            goals: goalsData
        });

    } catch (error) {
        console.error('Error reading savings goals:', error);
        throw error;
    }
};

export default readSavingsGoals;

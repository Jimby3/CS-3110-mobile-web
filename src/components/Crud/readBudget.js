import { getAuth } from 'firebase/auth';
import {getFirestore, doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import Budget from "../../classes/Budget";

const readBudget = async () => {
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

        // Reference to the user's budget subcollection
        const budgetCollectionRef = collection(userDocumentRef, 'budget');

        // Query the budget subcollection
        const budgetQuerySnapshot = await getDocs(budgetCollectionRef);

        // Check if there are any documents in the budget subcollection
        if (budgetQuerySnapshot.empty) {
            throw new Error('No budget document found for the current user.');
        }

        // Assuming there's only one document, get its reference
        const budgetDocumentRef = budgetQuerySnapshot.docs[0].ref;

        // Get the budget document
        const budgetDocSnapshot = await getDoc(budgetDocumentRef);

        // Check if the budget document exists
        if (!budgetDocSnapshot.exists()) {
            throw new Error('Budget document not found for the current user.');
        }

        // Get budget data from the document
        const budgetData = budgetDocSnapshot.data();

        // Reference to the categories subcollection within the budget document
        const categoriesCollectionRef = collection(budgetDocumentRef, 'categories');

        // Query the categories subcollection
        const categoriesQuerySnapshot = await getDocs(categoriesCollectionRef);

        // Extract category data from the query snapshot
        const categoriesData = categoriesQuerySnapshot.docs.map(doc => doc.data());

        console.log("in read", categoriesData)

        // Convert budgetData and categoriesData into a Budget object
        const budget = Budget.fromJSON({
            categories: categoriesData, // Pass categories data directly
            ...budgetData // Pass other budget data
        });

        console.log("in read", budget)

        return budget;
    } catch (error) {
        console.error('Error reading budget:', error);
        throw error;
    }
};


export default readBudget;

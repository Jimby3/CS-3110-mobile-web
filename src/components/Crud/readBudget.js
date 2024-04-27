import { getAuth } from 'firebase/auth';
import {getFirestore, doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import Budget from "../../classes/Budget";

const readBudget = async () => {
    try {
        // Get Firebase Auth instance and current user
        const auth = await getAuth();
        const currentUser = auth.currentUser;
        console.log('Current user:', currentUser);

        if (!currentUser) {
            throw new Error('No user is currently signed in.');
        }

        // Get Firestore instance
        const db = getFirestore();
        console.log('Firestore instance:', db);

        // Reference to the users collection
        const usersCollectionRef = collection(db, 'users');
        console.log('Users collection reference:', usersCollectionRef);

        // Query for the user's document based on userID field
        const userQuery = query(usersCollectionRef, where('userId', '==', currentUser.uid));
        console.log('User query:', userQuery);

        // Execute the query
        const userQuerySnapshot = await getDocs(userQuery);
        console.log('User query snapshot:', userQuerySnapshot);

        // Check if there are any matching documents
        if (userQuerySnapshot.empty) {
            throw new Error('No user document found for the current user.');
        }

        // Assuming there's only one document, get its reference
        const userDocumentRef = userQuerySnapshot.docs[0].ref;
        console.log('User document reference:', userDocumentRef);

        // Reference to the user's budget subcollection
        const budgetCollectionRef = collection(userDocumentRef, 'budget');
        console.log('Budget collection reference:', budgetCollectionRef);

        // Query the budget subcollection
        const budgetQuerySnapshot = await getDocs(budgetCollectionRef);
        console.log('Budget query snapshot:', budgetQuerySnapshot);

        // Check if there are any documents in the budget subcollection
        if (budgetQuerySnapshot.empty) {
            throw new Error('No budget document found for the current user.');
        }

        // Assuming there's only one document, get its reference
        const budgetDocumentRef = budgetQuerySnapshot.docs[0].ref;
        console.log('Budget document reference:', budgetDocumentRef);

        // Get the budget document
        const budgetDocSnapshot = await getDoc(budgetDocumentRef);
        console.log('Budget document snapshot:', budgetDocSnapshot);

        // Check if the budget document exists
        if (!budgetDocSnapshot.exists()) {
            throw new Error('Budget document not found for the current user.');
        }

        // Get budget data from the document
        const budgetData = budgetDocSnapshot.data();
        console.log('Budget data:', budgetData);

        // Reference to the categories subcollection within the budget document
        const categoriesCollectionRef = collection(budgetDocumentRef, 'categories');
        console.log('Categories collection reference:', categoriesCollectionRef);

        // Query the categories subcollection
        const categoriesQuerySnapshot = await getDocs(categoriesCollectionRef);
        console.log('Categories query snapshot:', categoriesQuerySnapshot);

        // Extract category data from the query snapshot
        const categoriesData = categoriesQuerySnapshot.docs.map(doc => doc.data());
        console.log('Categories data:', categoriesData);

        // Convert budgetData and categoriesData into a Budget object
        const budget = Budget.fromJSON({
            categories: categoriesData, // Pass categories data directly
            ...budgetData // Pass other budget data
        });

        return budget;
    } catch (error) {
        console.error('Error reading budget:', error);
        throw error;
    }
};


export default readBudget;

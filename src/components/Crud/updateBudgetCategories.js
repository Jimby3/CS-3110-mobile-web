import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, deleteDoc, addDoc } from 'firebase/firestore';

const updateBudgetCategories = async (newCategories) => {
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

        // Reference to the categories subcollection within the budget document
        const categoriesCollectionRef = collection(budgetDocumentRef, 'categories');

        // Fetch existing categories
        const existingCategoriesSnapshot = await getDocs(categoriesCollectionRef);


        // Delete all existing documents in the categories subcollection
        existingCategoriesSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Create new documents based on the combined list of categories
        await Promise.all(newCategories.map(async (category) => {
            // Create a new document reference within the categories subcollection
            try {
                await addDoc(categoriesCollectionRef, category.toObject());
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }));

        console.log('Budget categories updated successfully');
    } catch (error) {
        console.error('Error updating budget categories:', error);
        throw error;
    }
};

export default updateBudgetCategories;

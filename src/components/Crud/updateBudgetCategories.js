import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, deleteDoc, addDoc } from 'firebase/firestore';

const updateBudgetCategories = async (newCategories) => {
    console.log("Inside Update Budget Categories")
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

        // Get names of existing categories
        const existingCategoryNames = existingCategoriesSnapshot.docs.map(doc => doc.data().name);

        // Remove duplicates from both existing categories and new categories
        const filteredExistingCategories = existingCategoriesSnapshot.docs.filter(doc => {
            const categoryName = doc.data().name;
            return !newCategories.some(category => category.name === categoryName);
        });

        const filteredNewCategories = newCategories.filter(category => !existingCategoryNames.includes(category.name));

        // Delete all existing documents in the categories subcollection
        await Promise.all(filteredExistingCategories.map(async (doc) => {
            await deleteDoc(doc.ref);
        }));

        // Create new documents based on the filtered list of categories
        await Promise.all(filteredNewCategories.map(async (category) => {
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


import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const updateBudgetCategories = async (categoryUpdates) => {
    try {
        // Get Firebase Auth instance and current user
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No user is currently signed in.');
        }

        // Get Firestore instance
        const db = getFirestore();

        // Reference to the user's budget document
        const budgetDocRef = doc(db, `users/${currentUser.uid}/budget`, 'budget_document_id');

        // Update budget categories
        await updateDoc(budgetDocRef, {
            categories: categoryUpdates // Assuming 'categories' is the field name in your budget document
        });

        console.log('Budget categories updated successfully');
    } catch (error) {
        console.error('Error updating budget categories:', error);
        throw error;
    }
};

export default updateBudgetCategories;

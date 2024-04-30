import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const updateWithholding = async (newWithholding) => {
    console.log("Inside updateColoradoFML")
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

        // Query for the user's document based on userID field (assuming UID is not the document ID)
        const userQuery = query(usersCollectionRef, where('userId', '==', currentUser.uid));

        // Execute the query
        const userQuerySnapshot = await getDocs(userQuery);

        // Check if there are any matching documents
        if (userQuerySnapshot.empty) {
            throw new Error('No user document found for the current user.');
        }

        // Assuming there's only one document, get its reference
        const userDocumentRef = userQuerySnapshot.docs[0].ref;

        // Update the income field in the user document
        await updateDoc(userDocumentRef, { withholding: newWithholding });

        console.log('Income updated successfully');
    } catch (error) {
        console.error('Error updating income:', error);
        throw error;
    }
};

export default updateWithholding;

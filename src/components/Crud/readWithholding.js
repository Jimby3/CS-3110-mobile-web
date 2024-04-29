import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

const readWithholding = async () => {
    console.log("Inside readWithholding");
    try {
        // Initialize Firebase Auth
        const auth = await getAuth();

        // Get current user
        const currentUser = auth.currentUser;

        // Check if user is signed in
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

        // Get the user document
        const userDocSnapshot = await getDoc(userDocumentRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            return userData.withholding; // Assuming the field is named 'withholding' in the document
        } else {
            throw new Error('User document does not exist.');
        }
    } catch (error) {
        console.error('Error reading withholding:', error);
        throw error;
    }
};

export default readWithholding;

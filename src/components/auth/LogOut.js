import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const LogOut = () => {

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            window.location = '/'
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default LogOut;

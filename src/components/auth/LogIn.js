// Login.js

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            let auth = getAuth()
            await signInWithEmailAndPassword(auth, email, password);
            // User logged in successfully
        } catch (error) {
            // Handle login errors
            setError(error.message);
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email"/>
            <br></br>
            <br></br>
            <input className="input-field" type="password" value={password}
                   onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <br></br>
            <br></br>
            <button className="button" onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;

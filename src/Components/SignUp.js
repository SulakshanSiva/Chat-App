import {useState} from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../firebase.js"
import '../Styles/RegisterPage.css'
import Navbar from "./Navbar.js";
    
function SignUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const moveToLogIn = () => {
        navigate('/')
    }

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //set username
        updateProfile(auth.currentUser, {
        displayName: username 
        })
        //save account to firestore
        await setDoc(doc(db, "users", username), {
            username,
            email,
            uid: user.uid
        });
        await setDoc(doc(db, "userChats", user.uid), {});
        //navigate to Log In Page
        navigate('/');
        })
        .catch((error) => {
        setError(true);
        // ..
        }); 
    }
        
    return(
        <div>
            <Navbar/>
            <div className="page">
                <div className="box">
                    <h1 className="mb-3">Sign Up</h1>

                    <div>
                        {error && <p className="errorMsg">Invalid User Details. Try Again.</p>}
                        <label className="mb-1" for="username">Username</label>
                        <div className="align-items-center">
                            <input placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} type="text"></input>
                        </div>
                    </div>

                    <div className="mt-2 mb-2">
                        <label className="mb-1" for="email">Email</label>
                        <div className="align-items-center">
                            <input placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email"></input>
                        </div>
                    </div>

                    <div className="mt-2 mb-4">
                        <label className="mb-1" for="password">Password</label>
                        <div className="align-items-center">
                            <input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div className="wrapper mt-2">
                        <button className="btn btn-primary" onClick={createAccount}>Register</button>
                    </div>

                    <p className="text-center mt-3">
                        Already have an account?
                        <a className="text-primary text-decoration-none" onClick={moveToLogIn}> Log in here</a>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default SignUp;
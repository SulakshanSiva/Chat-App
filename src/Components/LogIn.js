import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "./Navbar";
import '../Styles/RegisterPage.css'

function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const moveToRegisterAccount = () => {
        navigate('/SignUp');
    };

    const logUserIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/Home');
        // ...
        })
        .catch((error) => {
            setError(true);
        });
    }
    
    return(
        <div>
            <Navbar/>
            <div className="page">
                <div className="box">
                    <h1 className="mb-3">Log In</h1>
                    
                    <div className="mt-2 mb-2"> 
                    {error && <p className="errorMsg">Incorrect Email and/or Password.</p>}
                        <label className="mb-1" for="email">Email Address</label>
                        <div>
                            <input placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email"></input>
                        </div>
                    </div>
                    
                    <div className="mt-2 mb-4">
                        <label className="mb-1" for="password">Password</label>
                        <div>
                            <input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div className="wrapper mt-2 ">
                        <button className="btn btn-primary" onClick={logUserIn}>Sign In</button>
                    </div>
                
                    <p className="text-center mt-3">
                        Don't have an account?
                        <a className="text-primary text-decoration-none" onClick={moveToRegisterAccount}> Register Here</a>
                    </p>

                    
                </div> 
            </div>
        </div>
    );
}

export default LogIn;
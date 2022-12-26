import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.js';
import {useContext} from "react";

function SideNav(){

    const {currentUser} = useContext(AuthContext); 
    const navigate = useNavigate();


    const logOut = () => {      
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        //move to log in page
        navigate('/');
        }).catch((error) => {
        // An error happened.
        });
    }


    return(
        <div className="sideNav">
            <div className="user">
                <span>{currentUser.displayName}</span>
                <button className='btn btn-primary btn-sm' onClick={logOut}>Log Out</button>
            </div>
            <hr className=""></hr>
        </div>
    );
}

export default SideNav;
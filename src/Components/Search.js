import { useState } from "react";
import {db} from "../firebase"
import {collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore"
import { AuthContext } from '../Context/AuthContext.js';
import {useContext} from "react";

function Search(){
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("username", "==", username));

        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());     
            });
        } catch(error){
            setError(true);
        }
        
    }

    const handleSelect = async () => {
        //check if conversations already exists in firestore, create new one if not
        const combinedId = currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid; 
        
        try{    
            const res = await getDoc(doc(db, "chats", combinedId))
            //if chat does not exist/ is not found 
            if(!res.exists()){
                //create a chat in collection
                await setDoc(doc(db, "chats", combinedId), {messages: []});

                //create user chat
                await updateDoc(doc(db, "userChats", currentUser.uid),{ 
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        username: user.username
                    },
                    [combinedId+".date"]: serverTimestamp()
                });

                //create user chat
                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]:{
                        uid: currentUser.uid,
                        username: currentUser.displayName
                    },
                    [combinedId+".date"]: serverTimestamp()
                });
            }

        } catch (error) {}

        setUser(null);
        setUsername("");
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" 
                placeholder="Search for a user" 
                onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)}
                value={username}/>
            </div>
            {error && <span>User not Found!</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <div className="userChatInfo">
                    <span>{user.username}</span>
                </div>
            </div>
            }
        </div> 
    );
}

export default Search;
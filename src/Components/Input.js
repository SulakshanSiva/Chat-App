import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import {db} from "../firebase"
import {v4 as uuid} from "uuid"

function Input(){
    const [text, setText] = useState('');

    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        await updateDoc(doc(db, "chats", data.chatId),{
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId : currentUser.uid,
                date: Timestamp.now()   
                })
            }
        )
        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
            text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
            text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("")
    }

    return(
        <div className="input">
            <input type="text" 
            placeholder="Send your message here..."
            value={text}
            onChange={(e)=> setText(e.target.value)}> 
            </input>

            <button className="btn btn-primary btn-sm" onClick={handleSend}>Send</button>
        </div>
    );
}

export default Input;
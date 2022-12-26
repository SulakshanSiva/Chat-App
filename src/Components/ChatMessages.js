import Message from "./Message.js";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useState } from 'react';
import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import {db} from "../firebase"

function ChatMessages(){
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages);
        })
        return () => {
            unSub();
        }
    },[data.chatId]);

    return(
        <div className="chatMessages">
            {messages.map(m=>(
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}

export default ChatMessages;
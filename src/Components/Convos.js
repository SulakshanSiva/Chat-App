import React, {useEffect, useState} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase"
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from "../Context/ChatContext";

function Convos(){
    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext);

    const [chats, setChats] = useState([]);

   useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u})
    };

    return( 
        <div className="convos">
            {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo) }>
                <div className="userChatInfo">
                    <span>{chat[1].userInfo?.username}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Convos;
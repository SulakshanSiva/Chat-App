import '../Styles/Home.css';
import ChatMessages from './ChatMessages.js';
import Input from './Input.js'
import { ChatContext } from "../Context/ChatContext";
import { useContext } from 'react';

function Chat(){
    
    const { data } = useContext(ChatContext);

    return(
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.username}</span>
            </div>
            <ChatMessages/>
            <Input/>
        </div>
    );
}

export default Chat;
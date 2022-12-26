import { useContext, useEffect, useRef} from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";


const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    // const { data } = useContext(ChatContext);

    

    return(
        <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
            </div>
        </div>
    );
}

export default Message;
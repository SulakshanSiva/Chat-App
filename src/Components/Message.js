import { useContext} from "react";
import { AuthContext } from "../Context/AuthContext";

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    return(
        <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
            </div>
        </div>
    );
}

export default Message;
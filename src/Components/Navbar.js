import logo from "../Assets/Images/chaticon.png"

function Navbar(){
    return(
        <div>
            <nav class="navbar navbar-light bg-white">
                <div class="container">
                    <h1 class="navbar-brand">Chat App</h1>
                    <img src={logo} alt="Chat"></img>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
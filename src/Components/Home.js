import '../Styles/Home.css';
import Chat from './Chat.js'   
import Sidebar from './Sidebar.js'
import Navbar from './Navbar.js'

function Home() {
    return(
        <div>
        <Navbar/>
        <div className='home'>
            
            <div className="contain">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
        </div>
    );
}

export default Home;
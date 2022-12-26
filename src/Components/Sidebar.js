import '../Styles/Home.css';
import SideNav from './SideNav.js'
import Search from './Search.js'
import Convos from './Convos.js'

function Sidebar(){
    return(
        <div className='sidebar'>
            <SideNav/>
            <Search/>
            <Convos/>
        </div>
    );
}

export default Sidebar;
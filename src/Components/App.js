import '../Styles/App.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home'
import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


function App() {
    const {currentUser} = useContext(AuthContext)

    const ProtectedRoute = ({children}) => {
        if(!currentUser){
            return <Navigate to="/"/>
        }

        return children;
    }

    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<LogIn/>}></Route>
                    <Route path="/SignUp" element={<SignUp/>}></Route>
                    <Route path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
        
    );
}

export default App;

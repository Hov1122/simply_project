import React, {useState} from 'react';
import "./menu.css";
import Loading from '../common/Loading';
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../../state-management/auth/requests';
import {  NavLink, useLocation, useNavigate } from 'react-router-dom';

function Menu() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    if(loading) {
        return <Loading />
    }
 
    return (
    
           pathname !== '/' ? 
           <div className={`menu`}>
               <NavLink to="/home">
                <button>Home</button>
               </NavLink>

               <NavLink to='schedule'>
                    <button>Schedule</button>
                </NavLink>

                <NavLink to='tests'>
                    <button>Tests</button>
                </NavLink>
                <button onClick={() => {
                    dispatch(logoutRequest())
                }}>Logout</button>
            </div> : null
        
    );
}

export default Menu;
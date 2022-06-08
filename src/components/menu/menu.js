import React, { useEffect, useState } from 'react';
import "./menu.css";
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../../state-management/auth/requests';
import {  NavLink } from 'react-router-dom';
import { authSelector } from '../../state-management/auth/selectors';

function Menu() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { token } = useSelector(authSelector)

    useEffect(() => {
            setLoading(false);
    }, [])

    if(loading) {
        return <Loading />
    }
 
    return (
    
           token ? 
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
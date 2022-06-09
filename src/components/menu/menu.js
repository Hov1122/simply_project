import React, { useEffect, useState } from 'react';
import "./menu.css";
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../../state-management/auth/requests';
import {  NavLink } from 'react-router-dom';
import { authSelector } from '../../state-management/auth/selectors';
import { AnimatePresence, motion } from 'framer-motion'


function Menu({ showMenu }) {
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
            <AnimatePresence>
                    {showMenu &&
                <motion.div className={`menu`} key="menu"
                        initial={{x: '-100vw'}}
                        animate={{x: 0, transition: {ease: 'easeInOut', duration: .8}}}
                        exit={{x: '-100vw', transition: {ease: "easeIn", duration: .8}}}
                >
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
                        
                    </motion.div>}
            </AnimatePresence> : null
        
    );
}

export default Menu;
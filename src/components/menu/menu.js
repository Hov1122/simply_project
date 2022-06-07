import React, {useState} from 'react';
import "./menu.css";
import Loading from '../common/Loading';
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../../state-management/auth/requests';
import { useNavigate } from 'react-router-dom';

function Menu(props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(loading) {
        return <Loading />
    }

    const handleMenuClick = (e) => {
        const MenuButtons = document.querySelectorAll('.menu button')
        MenuButtons.forEach(element => {
            element.classList.remove('selected')
        })
        e.target.classList.add('selected')
        props.handleSwitchComp(e.target.innerText)
    }
 
    return (
        <div className={`menu`}>
            <button onClick={handleMenuClick} className={`selected`}>Home</button>
            <button onClick={handleMenuClick}>Schedule</button>
            <button onClick={handleMenuClick}>Tests</button>
            <button onClick={() => {
                dispatch(logoutRequest())
            }}>Logout</button>
        </div>  
    );
}

export default Menu;
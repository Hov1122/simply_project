import React, {useState} from 'react';
import "./Menu.css";
import Loading from '../common/Loading';
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../../state-management/auth/requests';

function Menu() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    if(loading) {
        return <Loading />
    }

    return (
        <div className={`menu`}>
            <button>Home</button>
            <button>Schedule</button>
            <button>Tests</button>
            <button>Home</button>
            <button onClick={() => {
                dispatch(logoutRequest())
            }}>logout</button>
        </div>
    );
}

export default Menu;
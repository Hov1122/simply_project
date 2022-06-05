import React, {useState} from 'react';
import "./menu.css";
import Loading from '../common/Loading';

function Menu() {
    const [loading, setLoading] = useState(false);

    if(loading) {
        return <Loading />
    }

    return (
        <div className={`menu`}>
            <button>Home</button>
            <button>Schedule</button>
            <button>Tests</button>
            <button>Home</button>
        </div>
    );
}

export default Menu;
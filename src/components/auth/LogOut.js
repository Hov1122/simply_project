import React from 'react';

function LogOutPage(props) {

    const logoutHandler = () => {
        props.logOutHandler();
    }

    return (
        <div className="logout-container">
            <button onClick={logoutHandler}>Log Out</button>
        </div>
    );
}

export default LogOutPage;
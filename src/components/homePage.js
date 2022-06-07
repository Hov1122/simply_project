import React, {useState} from 'react';
import "./homePage.css";
import Loading from './common/Loading';

function HomePage() {
    const [loading, setLoading] = useState(false);
    
    if(loading) {
        return <Loading />
    }

    return (
        <div className={`homePage`}>

        </div>
    );
}

export default HomePage;
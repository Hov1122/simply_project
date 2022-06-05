import React, {useState} from 'react';
import "./home.css";
import Loading from '../common/Loading';

function Home() {
    const [loading, setLoading] = useState(false);

    if(loading) {
        return <Loading />
    }

    return (
        <div className={`home`}>

        </div>
    );
}

export default Home;
import React, {useState} from 'react';
import "./HomePage.css";
import Loading from './common/Loading';
import Menu from "./menu/menu";
import Home from "./home/Home";

function HomePage() {
    const [loading, setLoading] = useState(false);

    if(loading) {
        return <Loading />
    }

    return (
        <div className={`homePage`}>
            <Menu />
            <Home />
        </div>
    );
}

export default HomePage;
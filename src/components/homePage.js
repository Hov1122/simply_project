import React, {useState} from 'react';
import "./homePage.css";
import Loading from './common/Loading';
import Menu from "./menu/menu";
import Home from "./home/home";

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
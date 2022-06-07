import React, {useState} from 'react';
import "./homePage.css";
import Loading from './common/Loading';
import Menu from "./menu/menu";
import Home from "./home/home";
import Schedule from './schedule/schedule';
import Tests from './tests/tests';

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [comp, setComp] = useState('home')
    
    if(loading) {
        return <Loading />
    }

    const componentSwitch = (param) => {
        console.log(param)
        switch (param) {
            case 'Schedule' :
                return <Schedule />
            case 'Tests' :
                return <Tests />
            default :
                return <Home />
        }
    }

    const handleSwitchComp = (compName) => {
        setComp(compName)
    }

    return (
        <div className={`homePage`}>
            <Menu handleSwitchComp = {handleSwitchComp}/>
            {componentSwitch(comp)}
        </div>
    );
}

export default HomePage;
import React from "react";
import './Loading.css'

const Loading = ({width, height}) =>{
    return <div className="Loading" style={{width, height}}/>

    
}
Loading.defaultProps = {
        width: '32px',
        height: '32px',
    }
export default Loading
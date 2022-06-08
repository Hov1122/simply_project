import React from 'react'
import './Main.css'

const Main = (props) => {
  return (
    <div className='Main-Container'>
        {props.children}
    </div>
  )
}

export default Main
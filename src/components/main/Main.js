import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './Main.css'

const Main = (props) => {
  let location = useLocation();
  const mainContainer = useRef(null)

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      mainContainer.current.classList.add('login')
    } else {
      mainContainer.current.classList.remove('login')
    }
  }, [location.pathname])
  

  console.log(location.pathname)

  return (
    <div ref={mainContainer} className={'Main-Container'}>
        {props.children}
    </div>
  )
}

export default Main
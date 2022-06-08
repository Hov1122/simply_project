import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import defaultPic from '../../assets/defaultPic.jpg'
import { useSelector } from 'react-redux'
import { authSelector } from '../../state-management/auth/selectors'
import './Header.css'

const Header = ({ setShowMenu }) => {

  const { token } = useSelector(authSelector);

  return (
    token ? 
    <div className='Header-Container'>
        <FontAwesomeIcon icon={faBars} style={{
            color: '#ffff',
            fontSize: '35px',
            margin: 'auto 0'
        }} onClick={() => {
          setShowMenu((oldState) => (
            !oldState
          ))
        }}/>
        <div className='search-bar-container'>
            <input className='search-bar'/>
        </div>
        <img src={defaultPic} className='profile-picture'/>
    </div> : null
  )
}

export default Header
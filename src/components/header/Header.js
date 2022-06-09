import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import defaultPic from '../../assets/images/defaultPic.jpg'
import { useSelector } from 'react-redux'
import { authSelector } from '../../state-management/auth/selectors'
import searchIcon from '../../assets/images/search.png'
import './Header.css'

const Header = ({ setShowMenu }) => {

  const { token } = useSelector(authSelector);

  return (
    token ? 
    <div className='Header-Container'>
        <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={() => {
          setShowMenu((oldState) => (
            !oldState
          ))
        }}/>
        <div className='search-bar-container'>
            <img src={searchIcon} className='search-icon'/>
            <input className='search-bar' placeholder='Search User'/>
        </div>
        <img src={defaultPic} className='profile-picture'/>
    </div> : null
  )
}

export default Header
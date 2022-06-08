import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import defaultPic from '../../assets/defaultPic.jpg'
import './Header.css'

const Header = () => {
  return (
    <div className='Header-Container'>
        <FontAwesomeIcon icon={faBars} style={{
            color: '#ffff',
            fontSize: '35px',
            margin: 'auto 0'
        }}/>
        <div className='search-bar-container'>
            <input className='search-bar'/>
        </div>
        <img src={defaultPic} className='profile-picture'/>
    </div>
  )
}

export default Header
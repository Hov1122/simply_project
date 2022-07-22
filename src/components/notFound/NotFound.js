import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {

    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1);
    }

  return (
    <div className='NotFound-Container'>
        <button className='go-back-button' onClick={goBackHandler}>Go Back</button>
        <h2 className='not-found-title'>Page Not Found</h2>
    </div>
  )
}

export default NotFound
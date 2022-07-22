import { Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from '../../state-management/users/selectors'

const ErrorOrSuccess = ({successMessage}) => {
    const { error } = useSelector(usersSelector)
    if (error) return <Alert severity="error" sx={{margin: "15px auto"}}>{error}</Alert>
    return (
        <Alert severity="success" sx={{margin: "15px auto"}}>{successMessage}</Alert>
    )
  
}

export default ErrorOrSuccess
import { Alert, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom'
import { resetPasswordRequest } from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import ErrorOrSuccess from "../../common/ErrorOrSuccess";
import Loading from "../../common/Loading";


import "./Reset.css";


const Reset = () => {
    const {userId, recovery_token} = useParams()
    const [password, setPassword] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [changepassword, setchangepassword] = useState('')
    const dispatch = useDispatch()
    const { loading } = useSelector(usersSelector)

    return (
      <div className="reset-page">
        <div className="reset-component">
          <h2 style={{ marginBottom: 20 }}>Reset your account password.</h2>

          <TextField
              sx={{marginBottom: "20px"}}
              variant="outlined"
              label="Type new password..."
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
          >
          </TextField>
          <TextField
              className="input-reset-pass"
              variant="outlined"
              label="Repet your new password..."
              name="changepassword"
              type="password"
              value={changepassword}
              onChange={(e) => {
                setchangepassword(e.target.value)
              }}
          >
          </TextField>
          <div>
            <NavLink to='/' className="reset-to-home-link">
              Try to login.
            </NavLink>
          </div>
          {password !== changepassword && <Alert severity="error" sx={{margin: "15px auto"}}>Both fields need to be the same!</Alert>}
          {showMessage && <ErrorOrSuccess successMessage="Your password changed successfully."/>}
          {loading && <div 
                      style={{
                        position: 'relative',
                        margin: '40px 0',
                        marginRight: '40px'
                      }}>
                        <Loading /> 
                      </div>}
          <button
            className="reset-button"
            disabled={!((password === changepassword) && (changepassword && password))}
            onClick={() => {
              dispatch(resetPasswordRequest({userId: +userId, recovery_token, password}))
              setShowMessage(true)
            }}
          >
            Reset
          </button>
          
        </div>
      </div>
    );
}

export default Reset;
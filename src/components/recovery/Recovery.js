import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Recovery.css";
import { recoverPasswordRequest } from "../../state-management/users/requests";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../state-management/users/selectors";
import Loading from "../common/Loading";
import { NavLink } from "react-router-dom";
import { Alert } from "@mui/material";

const Recovery = () => {
  const [recoveryMail, setrecoveryMail] = useState("");
  const dispatch = useDispatch();
  const { loading,error } = useSelector(usersSelector);
  const [success, setSuccess] = useState(false);

  return (
    <div className="recovery-page">
      <div className="recovery-component">
        <h2 style={{ marginBottom: 20 }}>Recover your account.</h2>
        { success && !error && <Alert severity="info" sx={{margin: "15px auto"}}>Check your email.If something is wrong try to contact with Administartion.</Alert>}
        { error && <Alert severity="error" sx={{margin: "15px auto"}}>There is no account with this email,try to contact with Administartion.</Alert>}
        <TextField
          variant="outlined"
          label="Type your email..."
          value={recoveryMail}
          onChange={(e) => {
            setrecoveryMail(e.target.value);
          }}
        ></TextField>
        {loading && (
          <div className="recovery-loading">
            <Loading />
          </div>
        )}

        <div className="did-remember-box">
          Did you remember your password?
          <NavLink to='/' className="recovery-to-home-link">
            Try to login.
          </NavLink>
        </div>

        <button
          className="reqovery-button"
          onClick={() => {
            dispatch(recoverPasswordRequest(recoveryMail));
            setSuccess(!error)
          }}
        >
          Recover
        </button>
      </div>
    </div>
  );
};

export default Recovery;

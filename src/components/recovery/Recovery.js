import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Recovery.css";
import { recoverPasswordRequest } from "../../state-management/users/requests";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../state-management/users/selectors";
import Loading from "../common/Loading";
import { NavLink } from "react-router-dom";
import ErrorOrSuccess from "../common/ErrorOrSuccess";

const Recovery = () => {
  const [recoveryMail, setrecoveryMail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector(usersSelector);
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className="recovery-page">
      <div className="recovery-component">
        <h2 style={{ marginBottom: 20 }}>Recover your account.</h2>
        {showMessage && <ErrorOrSuccess successMessage="Check your email.If something is wrong try to contact with Administartion."/>}
        <TextField
          variant="outlined"
          label="Type your email..."
          value={recoveryMail}
          onChange={(e) => {
            setrecoveryMail(e.target.value);
            showMessage && setShowMessage(false)
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
              setShowMessage(true)
          }}
        >
          Recover
        </button>
      </div>
    </div>
  );
};

export default Recovery;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Recovery.css";
import { recoverPasswordRequest } from "../../state-management/users/requests";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../state-management/users/selectors";
import Loading from "../common/Loading";

const Recovery = () => {
  const [recoveryMail, setrecoveryMail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector(usersSelector);
  //   const [success] = useState(); // to be continued

  return (
    <div className="recovery-page">
      <div className="recovery-component">
        <h2 style={{ marginBottom: 20 }}>Recover your account.</h2>
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
        <button
          className="reqovery-button"
          onClick={() => {
            dispatch(recoverPasswordRequest(recoveryMail));
          }}
        >
          Recover
        </button>
      </div>
    </div>
  );
};

export default Recovery;

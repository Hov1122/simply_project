import { CircularProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../state-management/auth/selectors";
import { updateUserRequest } from "../../../state-management/users/requests";
import Loading from "../../common/Loading";
import Divider from "@material-ui/core/Divider";
import "./MyProfile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { Alert } from "@mui/material";
import ErrorOrSuccess from "../../common/ErrorOrSuccess";

const Profile = () => {
  const [passwordError, setPasswordError] = useState('');
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false)

  const {
    user: {
      id,
      firstName,
      lastName,
      email,
      avgMark,
      role: { name },
    },
  } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError('');
    }
  }, [newPassword, repeatPassword]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="Profile-Container">
      <h2
        style={{
          marginBottom: 40,
          display: "flex",
          justifyContent: "space-between",
          color: "#344767",
          width: "12%",
        }}
      >
        <SettingsIcon style={{ margin: "auto" }} />
        Settings
      </h2>
      <div className="Profile-Info-Container">
        <div className="User-Profile">
          <div className="disabled-info">
            <h4>Profile information</h4>
            <Divider />
            <div className="row">
              <TextField
                style={{marginBottom: "20px", marginRight: "10px"}}
                id="outlined-basic"
                label="First name"
                disabled={true}
                size="small"
                value={firstName}
                variant="outlined"
                className="disabled-textfield"
              />
              <TextField
                style={{marginBottom: "20px", marginRight: "10px"}}
                id="outlined-basic"
                label="Last name"
                disabled={true}
                size="small"
                value={lastName}
                variant="outlined"
                className="disabled-textfield"
              />
            </div>
            <div className="row">
              <TextField
                style={{marginBottom: "20px", marginRight: "10px"}}
                id="outlined-basic"
                label="Role"
                disabled={true}
                size="small"
                value={name}
                variant="outlined"
                className="disabled-textfield"
              />
              <TextField
                style={{marginBottom: "20px", marginRight: "10px"}}
                id="outlined-basic"
                label="Email"
                disabled={true}
                size="small"
                value={email}
                variant="outlined"
                className="disabled-textfield"
              />
            </div>
          </div>
          <div style={{ margin: "auto" }}>
            <div className="Average-Mark-Container">
              <h4>Average mark</h4>
              <span className="average-mark-profile">
                {avgMark?.toFixed(2) || 0}/100
              </span>
              <CircularProgress
                variant="determinate"
                value={avgMark?.toFixed(2) || 1}
                size={100}
                style={{
                  color:
                    avgMark?.toFixed(2) > 60
                      ? "#03590a"
                      : avgMark?.toFixed(2) > 40
                      ? "#d9c725"
                      : "#c40014",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="Profile-Info-Container">
        <h4>Change password</h4>
        <Divider />
        {showMessage && <ErrorOrSuccess successMessage="Your password successfully changed!"/>}
        <div className="password-bar">
          <TextField
            style={{marginBottom: "20px"}}
            id="outlined-basic"
            label="Old password..."
            type="password"
            size="small"
            variant="outlined"
            onInput={(e) => {
              setOldPassword(e.target.value);
            }}
          />
          <TextField
            style={{marginBottom: "20px"}}
            id="outlined-basic"
            label="New password..."
            type="password"
            size="small"
            variant="outlined"
            onInput={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            style={{marginBottom: "20px"}}
            id="outlined-basic"
            label="Repeat new password..."
            type="password"
            size="small"
            variant="outlined"
            onInput={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>
        {passwordError && <Alert severity="error">{passwordError}</Alert>}
        <button
          disabled={
            !(oldPassword && newPassword && repeatPassword && !passwordError)
          }
          className="save-changes"
          onClick={() => {
            setLoading(true);
            setShowMessage(true);
            dispatch(
              updateUserRequest({ id, password: oldPassword, newPassword })
            );

            setTimeout(() => {
              setLoading(false);
            }, 2000);

            setOldPassword("");
            setNewPassword("");
            setRepeatPassword("");
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;

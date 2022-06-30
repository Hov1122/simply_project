import { CircularProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../state-management/auth/selectors";
import { updateUserRequest } from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import Loading from "../../common/Loading";
import Divider from "@material-ui/core/Divider";
import "./MyProfile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { Alert } from "@mui/material";

const Profile = () => {
  const [passwordError, setPasswordError] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const { error } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
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
                id="outlined-basic"
                label="First name"
                disabled={"disabled"}
                size="small"
                value={firstName}
                variant="outlined"
                className="disabled-textfield"
              />
              <TextField
                id="outlined-basic"
                label="Last name"
                disabled={"disabled"}
                size="small"
                value={lastName}
                variant="outlined"
                className="disabled-textfield"
              />
            </div>
            <div className="row">
              <TextField
                id="outlined-basic"
                label="Role"
                disabled={"disabled"}
                size="small"
                value={name}
                variant="outlined"
                className="disabled-textfield"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                disabled={"disabled"}
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
                {avgMark?.toFixed(2)}/100
              </span>
              <CircularProgress
                variant="determinate"
                value={avgMark?.toFixed(2) || 100}
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
        {success && !error && (
          <Alert severity="success">Your password successfully changed!</Alert>
        )}
        {error && <Alert severity="error">Password is not correct!</Alert>}
        <div className="password-bar">
          <TextField
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
          onClick={async () => {
            setLoading(true);
            dispatch(
              updateUserRequest({ id, password: oldPassword, newPassword })
            );

            setTimeout(() => {
              error
                ? setSuccess("")
                : setSuccess("Password changed successfully");
              console.log(error);
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

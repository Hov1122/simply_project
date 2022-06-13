import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { updateUserRequest } from "../../state-management/users/requests";
// import { usersSelector } from "../../state-management/users/selectors";
import "./Profile.css";

const Profile = () => {
  const [passwordError, setPasswordError] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const {
    user: { id },
  } = useSelector(authSelector);
  // const { error } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  }, [newPassword, repeatPassword]);

  return (
    <div className="Profile-Container">
      <div className="Change-Password-Container">
        <h3>Change Password</h3>
        <input
          type="password"
          className="old-password"
          placeholder="Old Password"
          value={oldPassword}
          onInput={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <input
          type="password"
          className="new-password"
          placeholder="New Password"
          value={newPassword}
          onInput={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <input
          type="password"
          className="new-password"
          placeholder="Repeat New Password"
          value={repeatPassword}
          onInput={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        {passwordError && <p className="password-error">{passwordError}</p>}
        <button
          disabled={
            !(oldPassword && newPassword && repeatPassword && !passwordError)
          }
          className="change-password-button"
          onClick={() => {
            dispatch(
              updateUserRequest({ id, password: oldPassword, newPassword })
            );
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;

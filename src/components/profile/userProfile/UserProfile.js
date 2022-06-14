import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usersSelector } from "../../../state-management/users/selectors";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();

  const { users } = useSelector(usersSelector);

  const {
    firstName,
    lastName,
    email,
    role: { name },
  } = users.find((user) => user.id === +id);

  return (
    <div className="User-Profile-Container">
      <h2 style={{ marginLeft: 50 }}>Profile</h2>
      <span className="profile-user-fname">first name: {firstName}</span>
      <span className="profile-user-lname">last name: {lastName}</span>
      <span className="profile-user-email">email: {email}</span>
      <span className="profile-user-role">role: {name}</span>
    </div>
  );
};

export default UserProfile;

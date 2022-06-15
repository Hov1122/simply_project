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
      <table>
        <tbody>
          <tr>
            <td>FirstName:</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td>LastName:</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usersSelector } from "../../../state-management/users/selectors";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();

  const { users } = useSelector(usersSelector);

  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    avgMark,
    role: { name },
  } = users.find((user) => user.id === +id);

  return (
    <div className="User-Profile-Container">
      <button
        className="go-back-button user-profile-go-back"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <h2 style={{ marginLeft: 50 }}>Profile</h2>
      <div className="User-Profile">
        <h3>
          First Name: <span>{firstName}</span>
        </h3>

        <h3>
          Last Name: <span>{lastName}</span>
        </h3>

        <h3>
          Average Mark: <span>{avgMark}</span>
        </h3>

        <h3>
          Email: <span>{email}</span>
        </h3>

        <h3>
          Role: <span>{name}</span>
        </h3>
      </div>
    </div>
  );
};

export default UserProfile;

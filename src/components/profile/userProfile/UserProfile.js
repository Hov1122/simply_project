import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { usersSelector } from "../../../state-management/users/selectors";
import "./UserProfile.css";
import MyProfile from "../myProfile/MyProfile";

const UserProfile = () => {
  const { id: userId } = useParams();

  const {
    user: { id },
  } = useSelector(authSelector);
  const { users } = useSelector(usersSelector);

  const {
    firstName,
    lastName,
    email,
    avgMark,
    role: { name },
  } = users.find((user) => user.id === +userId);

  return +userId === id ? (
    <MyProfile />
  ) : (
    <div style={{ height: "100%", width: "100%", padding: "20px" }}>
      <div style={{ height: "75px" }}></div>
      <div className="User-Profile-Container">
        <h2 style={{ margin: "15px auto" }}>Profile</h2>
        <div className="User-Profile">
          <h3>
            First Name : <span>{firstName}</span>
          </h3>

          <h3>
            Last Name : <span>{lastName}</span>
          </h3>

          {name !== "Teacher" && (
            <h3>
              Average Mark : <span>{avgMark?.toFixed(2)}</span>
            </h3>
          )}

          <h3>
            Email : <span>{email}</span>
          </h3>

          <h3>
            Role : <span>{name}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

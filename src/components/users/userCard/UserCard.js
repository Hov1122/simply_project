import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ id, firstName, lastName, avgMark }) => {
  const navigate = useNavigate();

  return (
    <div
      className="User-Card-Container"
      onClick={() => navigate(`/userProfile/${id}`)}
    >
      <div style={{ marginTop: 20 }}>
        <span>First Name: {firstName}</span>
        <br />
        <span>Last Name: {lastName}</span>
      </div>
      <span className="user-card-mark">Average Mark: {avgMark}</span>
    </div>
  );
};

export default UserCard;

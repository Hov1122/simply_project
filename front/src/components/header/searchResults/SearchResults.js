import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import "./SearchResults.css";

const SearchResults = ({ foundUsers }) => {
  const {
    user: { id },
  } = useSelector(authSelector);
  const navigate = useNavigate();

  return (
    <div className="Search-Results-Container">
      {foundUsers.map(({ id: userId, firstName, lastName, isOnline, role }) => (
        <div
          className="Search-Results-Item"
          key={userId}
          onMouseDown={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          <span className="Search-Item-Name">
            {firstName} {userId === id && "(you)"}
          </span>
          <span className="Search-Item-Name">{lastName}</span>
          <span className="Search-Item-Role">{role.name}</span>
          {isOnline && <div className="Search-Item-Online"></div>}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

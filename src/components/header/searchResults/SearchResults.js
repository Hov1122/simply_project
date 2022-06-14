import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = ({ foundUsers }) => {
  const navigate = useNavigate();

  return (
    <div className="Search-Results-Container">
      {foundUsers.map(({ id, firstName, role }) => (
        <div
          className="Search-Results-Item"
          key={id}
          onMouseDown={() => {
            navigate(`/userProfile/${id}`);
          }}
        >
          <span className="Search-Item-Name">{firstName}</span>
          <span className="Search-Item-Role">{role.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

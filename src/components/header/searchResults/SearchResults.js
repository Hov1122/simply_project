import React from "react";
import "./SearchResults.css";

const SearchResults = ({ foundUsers }) => {
  return (
    <div className="Search-Results-Container">
      {foundUsers.map(({ id, firstName, role }) => (
        <div
          className="Search-Results-Item"
          key={id}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
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

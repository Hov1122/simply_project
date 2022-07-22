import { Avatar } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import "./UsersDropDown.css";

const UsersDropDown = ({ users, setShowUsers }) => {
  const dropDownRef = useRef(null);

  const {
    user: { id },
  } = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", closeUsersDropDown);
    document.body.classList.add("background-color");

    return () => {
      document.body.classList.remove("background-color");
      document.removeEventListener("click", closeUsersDropDown);
    };
  }, []);

  const closeUsersDropDown = (e) => {
    if (dropDownRef?.current?.contains(e.target) || !dropDownRef) return;

    setShowUsers(false);
  };

  return (
    <div className="Users-Drop-Down-Container" ref={dropDownRef}>
      <p className="members-count">Members: {users?.length}</p>
      {users?.map(({ user }) => {
        return (
          <div
            key={user?.id}
            className="User-Container"
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            <Avatar
              sx={{ bgcolor: "#2596be", marginTop: "10px" }}
              variant="circular"
            ></Avatar>
            <div className="full-name-container">
              <p>
                <b>{user?.firstName}</b>
              </p>
              <p>
                <b>
                  {user?.lastName} {user?.id === id && "(you)"}
                </b>
              </p>
            </div>
            {user?.isOnline && <div className="Search-Item-Online"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default UsersDropDown;

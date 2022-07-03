import React, {  useState } from "react";
import CreateGroup from "../groups/createGroup/CreateGroup";
import CreateUser from "../users/createUser/CreateUser";
import DeleteUser from "../users/deleteUser/DeleteUser";
import DeleteGroup from "../groups/deleteGroup/DeleteGroup";
import "./ChangeData.css";
import { useSelector } from "react-redux";
import { authSelector } from "../../state-management/auth/selectors";
import { Navigate } from "react-router-dom";

const ChangeData = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const {
    user: {
      role: { name },
    },
  } = useSelector(authSelector);

  return name === "Admin" ? (
    <div className="Change-Data-bar">
        <div className="Change-Data-Container-parrent">
        <div className="Change-Data-Container">
          <div className="Change-Data-Header">
              <span className="switcher switcher-1 switcher-user-group"
                onClick={() => {
                  setShowUsers((prev) => !prev)
                }}
              >
                <input type="checkbox" id="switcher-1" />
                <label htmlFor="switcher-1"></label>
              </span>

            {/* <div>
              <span
                className="active-link"
                ref={usersRef}
                onClick={() => {
                  setShowUsers(true);
                  usersRef.current.classList.add("active-link");
                  groupsRef.current.classList.remove("active-link");
                }}
              >
                Users
              </span>
              <span
                ref={groupsRef}
                onClick={() => {
                  setShowUsers(false);
                  groupsRef.current.classList.add("active-link");
                  usersRef.current.classList.remove("active-link");
                }}
              >
                Groups
              </span>
            </div> */}

            
              <span className="switcher switcher-1"
                onClick={() => {
                  setShowCreate((prev) => !prev)
                }}
              >
                <input type="checkbox" id="switcher-1" />
                <label htmlFor="switcher-1"></label>
              </span>
              { console.log( setShowCreate)
              /* <span
                className="active-link"
                ref={createRef}
                onClick={() => {
                  setShowCreate(true);
                  createRef.current.classList.add("active-link");
                  deleteRef.current.classList.remove("active-link");
                }}
              >
                Create
              </span>
              <span
                ref={deleteRef}
                onClick={() => {
                  setShowCreate(false);
                  deleteRef.current.classList.add("active-link");
                  createRef.current.classList.remove("active-link");
                }}
              >
                Delete
              </span> */}
          </div>

          
          <div className="Change-Data-Main">
            {showCreate ? (
              showUsers ? (
                <CreateUser />
              ) : (
                <CreateGroup />
              )
            ) : showUsers ? (
              <DeleteUser />
            ) : (
              <DeleteGroup />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/home" />
  );
};

export default ChangeData;

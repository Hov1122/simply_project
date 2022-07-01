import React, { useState, useEffect } from "react";
import "./DeleteUser.css";
import {
  fetchUsersRequest,
  deletedUserRequest,
} from "../../../state-management/users/requests";
import { usersSelector } from "../../../state-management/users/selectors";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { filterUsersByInput } from "../../../helpers/helpers";

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { users } = useSelector(usersSelector);
  const dispatch = useDispatch();
  const [filteredUsers, setfilteredUsers] = useState(users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  const userJSX = ({ id, firstName, email, lastName }) => {
    return (
      <div id="checklist" key={id}>
        <input
          id={id}
          type="checkbox"
          value={id}
          onChange={handleChangeUsers}
        />
        <label htmlFor={id}>
          <b>
            {`${firstName} ${lastName}`}
            <span className="user-email-span">{email}</span>
          </b>
        </label>
      </div>
    );
  };

  const handleChangeUsers = (e) => {
    let updatedList = [...user];
    if (e.target.checked) {
      updatedList = [...user, +e.target.value];
    } else {
      updatedList.splice(user.indexOf(e.target.value), 1);
    }
    setUser(updatedList);
  };

  const handleDeleteUser = () => {
    const data = {
      ids: user,
    };

    if (!data.ids[0]) {
      return;
    } else {
      dispatch(deletedUserRequest(data));
    }
  };

  return (
    <div className="Delete-User-Container">
      <div className="Delete-User-Container-Header">
        <h2 style={{ marginBottom: "25px" }}>Delete Users</h2>
        <div className="search-field-container">
          <TextField
            id="outlined-basic"
            label="Search user..."
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setLoading(true);
              setTimeout(() => {
                setfilteredUsers(filterUsersByInput(users, e.target.value));
                setLoading(false);
              }, 500);
            }}
          />
          <div className="loading-search-bar">
            {loading && <Loading width="20px" height="20px" />}
          </div>
        </div>
      </div>
      <div className="Delete-User-Container-Main">
        <div className="delete-table-wrapper">
          {filteredUsers.map((elem) => {
            return userJSX(elem);
          })}
        </div>
      </div>
      <div className="Delete-User-Container-Foot">
        <input value="Delete Users" type="button" onClick={handleDeleteUser} />
      </div>
    </div>
  );
};

export default DeleteUser;
